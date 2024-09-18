from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from django_backend.trinodb_conn import TrinoDbConnection
from django.core.cache import cache
import json
from django_backend.utils.cache_utils import get_nepal_cache_lifetime

CACHE_DATA_LIFETIME = get_nepal_cache_lifetime()

# api used for prodcution
# dim_address, dim_communication, dim_individual_customer


class GetIndividualInfoById(APIView):  # individual customer with c_id
    def get(self, request):
        id = request.query_params.get('id')
        branch_name = request.query_params.get('branch_name')

        cache_key = f"individual_info_{id}"
        if branch_name:
            cache_key += f"_{branch_name}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(json.loads(cached_data), status=status.HTTP_200_OK)

        # Base query
        query = """
            SELECT * FROM dimensions.dim_individual_customer as c
            JOIN dimensions.dim_address as address ON c.c_id=address.orgkey
            JOIN dimensions.dim_communication as com ON com.orgkey=address.orgkey
            WHERE c.C_ID = ? AND address.preferredaddress='Y' AND com.preferredflag='Y'
            AND com.phoneno IS NOT NULL
        """
        params = [id]

        # Add branch name filter if provided
        if branch_name:
            query = """
                SELECT * FROM dimensions.dim_individual_customer as c
                JOIN dimensions.dim_address as address ON c.c_id=address.orgkey
                JOIN gold_dimensions.dim_branch as b ON c.primary_sol_id = b.bank_id
                JOIN dimensions.dim_communication as com ON com.orgkey=address.orgkey
                WHERE c.C_ID = ? AND b.branch_description = ? AND address.preferredaddress='Y' AND com.preferredflag='Y'
                AND com.phoneno IS NOT NULL
            """
            params.append(branch_name)

        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query, params)
            if rows:
                customer = [dict(zip(column_names, row)) for row in rows]
                cache.set(cache_key, json.dumps(customer),
                          timeout=CACHE_DATA_LIFETIME)
                return Response(customer, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()


class GetIndividualStatistics(APIView):
    def get(self, request):
        c_id = request.GET.get('id', None)
        hub_name = request.GET.get('hub_name', None)
        sub_province = request.GET.get('sub_provincial', None)
        city_code = request.GET.get('city_code', None)
        branch_desc = request.GET.get('branch_desc', None)
        print(c_id, hub_name, sub_province, city_code, branch_desc)
        cache_key = "individual_statistics"
        if c_id:
            cache_key += f"_{c_id}"
        if hub_name:
            cache_key += f"_{hub_name}"
        if sub_province:
            cache_key += f"_{sub_province}"
        if city_code:
            cache_key += f"_{city_code}"
        if branch_desc:
            cache_key += f"_{branch_desc}"

        # Delete the cache for the given key if needed
        cache.delete(cache_key)

        # Check if cached data exists
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(json.loads(cached_data), status=status.HTTP_200_OK)

        # Base query
        query = """
            SELECT
                i.c_id,
                i.full_name,
                i.gender,
                i.cust_dob,
                i.primary_sol_id,
                b.branch_description
            FROM dimensions.dim_individual_customer AS i
            JOIN gold_dimensions.dim_branch AS b on b.branch_sol_id = CAST(i.primary_sol_id AS VARCHAR)
            WHERE i.constitution_code = 'INDIV'
        """

        # Add filters to the query
        params = []
        if c_id:
            query += " AND i.c_id LIKE ?"
            params.append(f"%{c_id}%")
        if branch_desc:
            query += " AND b.branch_description = ?"
            params.append(branch_desc)
        if hub_name:
            query += " AND b.hub_name = ?"
            params.append(hub_name)
        if sub_province:
            query += " AND b.sub_provincial = ?"
            params.append(sub_province)
        if city_code:
            query += " AND b.city_code = ?"
            params.append(city_code)

        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query, params)
            if not rows:
                return Response("No user found", status=status.HTTP_404_NOT_FOUND)
            individual_customers = [
                self.add_age_to_customer(dict(zip(column_names, row))) for row in rows
            ]
            cache.set(cache_key, json.dumps(
                individual_customers), timeout=CACHE_DATA_LIFETIME)

            return Response(individual_customers, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()

    def add_age_to_customer(self, customer):
        cust_dob = customer.get('cust_dob')
        if cust_dob:
            try:
                dob_datetime = datetime.strptime(
                    cust_dob, '%Y-%m-%dT%H:%M:%S.%f')
            except ValueError:
                dob_datetime = datetime.strptime(cust_dob, '%Y-%m-%dT%H:%M:%S')
            age = self.calculate_age(dob_datetime)
            customer['age'] = age
        return customer

    def calculate_age(self, dob):
        today = datetime.today()
        age = today.year - dob.year - \
            ((today.month, today.day) < (dob.month, dob.day))
        return age


# dim_address, dim_communication, dim_registration_document, dim_accounts, dim_relationship
class GetIndividualDetailsInfo(APIView):
    def get(self, request, id):
        cache_key = f"individual_details_info_{id}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(json.loads(cached_data), status=status.HTTP_200_OK)

        base_query_one = """
        SELECT
            entitydocumentid,
            identificationtype,
            idissuedorganisation,
            docissuedate,
            docexpirydate
        FROM dimensions.dim_registration_document WHERE orgkey=?
        """
        base_query_two = """
        SELECT * FROM dimensions.dim_relationship WHERE CAST(cif_id AS VARCHAR)=?
        """
        base_query_three = """
        SELECT email,
               phoneno,
               preferredflag
        FROM dimensions.dim_communication WHERE orgkey=?
        """
        base_query_four = """
        SELECT addresscategory,
               country,
               address_line1,
               state,
               city
        FROM dimensions.dim_address
        WHERE orgkey=?
        """
        base_query_five = """
        SELECT orgkey,
               name,
               occupation,
               riskrating
        FROM dimensions.dim_accounts WHERE orgkey=?
        """
        try:
            result_one = self.data_retrieval(base_query_one, id)
            result_two = self.data_retrieval(base_query_two, id)
            result_three = self.data_retrieval(base_query_three, id)
            result_four = self.data_retrieval(base_query_four, id)
            result_five = self.data_retrieval(base_query_five, id)

            response = {
                "registration": result_one,
                "relationship": result_two,
                "communication": result_three,
                "address": result_four,
                "account": result_five,
            }
            cache.set(cache_key, json.dumps(response), timeout=86400)

            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def data_retrieval(self, base_query, id):
        trino_conn = TrinoDbConnection()
        rows, column_names = trino_conn.execute_query(base_query, (id,))
        results = [dict(zip(column_names, row)) for row in rows]
        trino_conn.close()
        return results


class GetTotalTransactionBranchYTD(APIView):
    def get(self, request):
        c_id = request.query_params.get('id', None)
        # print(c_id, year, month, branch)
        # Convert year, month, and branch to integers
        # try:
        #     year = int(year) if year else None
        #     month = int(month) if month else None
        # except ValueError:
        #     return Response({"error": "Invalid year, month, or branch value."}, status=status.HTTP_400_BAD_REQUEST)
        # Base query
        if not c_id:
            return Response({"error": "ID needed"}, status=status.HTTP_400_BAD_REQUEST)

        cache_key = f"total_transaction_branch_ytd_{c_id}"
        cache.delete(cache_key)
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(json.loads(cached_data), status=status.HTTP_200_OK)

        query = """
        SELECT
            SUM(fact.total_tran_amt) AS total_txn_amt,
            SUM(fact.no_of_transactions) AS total_no_txn,
            d."nepali month number" AS nepali_month,
            d."nepali month name" AS nepali_name,
            d."nepali fiscal year" AS fiscal_year
        FROM facts.fact_customer_aact_txn_ytd AS fact
        INNER JOIN dimensions.dim_date AS d 
            ON fact.tran_year=d.year and fact.tran_month=d.month and fact.tran_day = d.dayofmonth
        WHERE ACID IN (
            SELECT ACID
            FROM dimensions.dim_gam AS g
            INNER JOIN dimensions.dim_individual_customer AS c ON g.CIF_ID = c.C_ID
            WHERE CIF_ID = ?
        )
    """

        # Add optional filters
        params = [c_id]
        # if year is not None:
        #     query += " AND fact.tran_year = ? "
        #     params.append(year)
        # if month is not None:
        #     query += " AND fact.tran_month = ? "
        #     params.append(month)
        # if branch is not None:
        #     query += " AND fact.sol_desc = ? "
        #     params.append(branch)
        # Finalize the query
        query += """
        GROUP BY
            d."nepali month number",
            d."nepali month name",
            d."nepali fiscal year"
        """
        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query, (params))
            customers = [dict(zip(column_names, row)) for row in rows]
            cache.set(cache_key, json.dumps(customers), timeout=86400)
            return Response(customers, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()


# needs working here
class GetIndividualInfo(APIView):
    def get(self, request):
        # cache_key = 'all_customers'
        # customers = cache.get(cache_key)

        # if customers is None:
        query = """SELECT * FROM dimensions.dim_individual_customer as customer
                join dimensions.dim_address as address on customer.c_id=address.orgkey
                where address.preferredaddress='Y'
            """
        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query)
            customers = [dict(zip(column_names, row)) for row in rows]
            # Cache for 15 minutes
            # cache.set(cache_key, customers, timeout=60*15)
            # print(customers)
            return Response(customers, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()
        # else:
        #     print("data already cached")
        #     return Response(customers, status=status.HTTP_200_OK)


class GetAccountInfo(APIView):
    def get(self, request, id):
        query = "SELECT * FROM dimensions.dim_accounts where orgkey=?"
        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query, (id,))
            if rows:
                details = [dict(zip(column_names, row)) for row in rows]
                return Response(details, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Detail not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()


class GetFactCustomerInfo(APIView):
    def get(self, request):
        query = "SELECT * FROM facts.fact_customer_aact_txn_ytd"
        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query)
            customers = [dict(zip(column_names, row)) for row in rows]
            return Response(customers, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()


class GetDim_Dam(APIView):
    def get(self, request):
        query = "SELECT * FROM dimensions.dim_gam"
        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query)
            if rows:
                details = [dict(zip(column_names, row)) for row in rows]
                return Response(details, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Detail not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()


class GetJoinedCustomerAccountInfo(APIView):
    def get(self, request):
        # Define your SQL query to join tables on c_id and orgKey
        query = """
        SELECT
            fact.dth_init_sol_id,SUM(fact.total_tran_amt) as total_txn_amt,SUM(no_of_transactions) AS total_no_txn,fact.tran_month,fact.tran_year, fact.sol_desc
        FROM facts.fact_customer_aact_txn_ytd AS fact  WHERE ACID IN( SELECT ACID FROM dimensions.dim_gam as g inner join dimensions.dim_individual_customer as c on g.CIF_ID=c.C_ID WHERE CIF_ID='10000163')
        group by fact.dth_init_sol_id,fact.tran_month,fact.tran_year,fact.sol_desc
        """
        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query)
            customers_accounts = [dict(zip(column_names, row)) for row in rows]
            return Response(customers_accounts, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()


class Test(APIView):
    def get(self, request):
        # Define your SQL query to join tables on c_id and orgKey
        # query = """
        # SELECT
        #     * from facts.fact_customer_aact_txn_ytd
        # """
        query = """
        select * from dimensions.dim_address
        """
        # query = """
        # select * from dimensions.dim_branch
        # """
        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query)
            customers_accounts = [dict(zip(column_names, row)) for row in rows]
            return Response(customers_accounts, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()


class TestByID(APIView):
    def get(self, request, id):
        # Define your SQL query to join tables on c_id and orgKey
        query = """
        SELECT
            * from dimensions.dim_gam where orgkey=?
        """
        trino_conn = TrinoDbConnection()
        try:
            row, column_name = trino_conn.execute_query(query, (id,))
            customers_account = dict(zip(column_name, row[0]))
            return Response(customers_account, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()
