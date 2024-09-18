from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django_backend.trinodb_conn import TrinoDbConnection
from django.core.cache import cache
from datetime import datetime
import json
from django_backend.utils.cache_utils import get_nepal_cache_lifetime

CACHE_DATA_LIFETIME = get_nepal_cache_lifetime()

class GetLegalInfo(APIView):
    def get(self, request):
        cache_key = f"legal_info"
        cache.delete(cache_key)  # Remove cache deletion in production
        cache_data = cache.get(cache_key)
        if cache_data:
            return Response(json.loads(cache_data), status=status.HTTP_200_OK)

        query = """
            SELECT
                *
            FROM gold_dimensions.dim_customers
            WHERE cust_type='LEGAL'
        """

        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query)
            individual_customers = [
                self.add_age_to_customer(dict(zip(column_names, row))) for row in rows
            ]
            # Convert datetime objects to strings before caching
            for customer in individual_customers:
                if 'cust_dob' in customer and customer['cust_dob']:
                    customer['cust_dob'] = datetime.strptime(
                        customer['cust_dob'], '%Y-%m-%dT%H:%M:%S.%f'
                    ).strftime('%Y-%m-%dT%H:%M:%S.%f')

            cache.set(cache_key, json.dumps(individual_customers),
                      timeout=CACHE_DATA_LIFETIME)
            return Response(individual_customers, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()

    def add_age_to_customer(self, customer):
        cust_dob = customer.get('cust_dob')
        if cust_dob:
            dob_datetime = datetime.strptime(cust_dob, '%Y-%m-%dT%H:%M:%S.%f')
            age = self.calculate_age(dob_datetime)
            customer['age'] = age
        return customer

    def calculate_age(self, dob):
        today = datetime.today()
        age = today.year - dob.year - \
            ((today.month, today.day) < (dob.month, dob.day))
        return age


class GetLegalInfoById(APIView):
    def get(self, request, id):
        # id = request.query_params.get('id', None)
        branch_name = request.query_params.get('branch_name', None)
        cache_key = f"legal_info_by_id_{id}_{branch_name or 'none'}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(json.loads(cached_data), status=status.HTTP_200_OK)
        query = """SELECT * FROM dimensions.dim_legal_customer WHERE c_id=?"""
        params = [id]

        if branch_name:
            query = """SELECT * FROM dimensions.dim_legal_customer as c
                       JOIN dimensions.dim_branch as b ON c.primary_sol_id = b.bank_id
                       WHERE c.c_id = ? AND b.sol_desc = ?
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


class GetLegalDetailsInfo(APIView):
    def get(self, request, id):
        cache_key = f"legal_details_info_{id}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(json.loads(cached_data), status=status.HTTP_200_OK)
        base_query_one = """
        select
            entitydocumentid,
            identificationtype,
            idissuedorganisation,
            docissuedate,
            docexpirydate
        from dimensions.dim_registration_document where orgkey=?
        """
        base_query_two = """
        select email,
            phoneno,
            preferredflag from dimensions.dim_communication where orgkey=?
        """
        base_query_three = """
        select addresscategory,
            country,
            address_line1,
            city from dimensions.dim_address where orgkey=?
        """
        base_query_four = """
            select orgkey, name, occupation, riskrating from dimensions.dim_accounts where orgkey=?
        """
        try:
            result_one = self.data_retrieval(base_query_one, id)
            result_two = self.data_retrieval(base_query_two, id)
            result_three = self.data_retrieval(base_query_three, id)
            result_four = self.data_retrieval(base_query_four, id)

            response = {
                "registration": result_one,
                "communication": result_two,
                "address": result_three,
                "account": result_four,
            }
            cache.set(cache_key, json.dumps(response),
                      timeout=CACHE_DATA_LIFETIME)
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


class GetTotalLegalTransactionBranchYTD(APIView):
    def get(self, request):
        c_id = request.query_params.get('id', None)
        cache_key = f"total_legal_transaction_branch_ytd_{c_id}"

        # Check if the data is cached
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(json.loads(cached_data), status=status.HTTP_200_OK)

        if not c_id:
            return Response({"error": "ID needed"}, status=status.HTTP_400_BAD_REQUEST)

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
        query = """
        SELECT
            SUM(fact.total_tran_amt) as total_txn_amt,SUM(no_of_transactions) AS total_no_txn,fact.tran_month,fact.tran_year
        FROM facts.fact_customer_aact_txn_ytd AS fact  WHERE ACID IN( SELECT ACID FROM dimensions.dim_gam as g inner join dimensions.dim_legal_customer as c on g.CIF_ID=c.C_ID WHERE CIF_ID=?)
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
            fact.tran_month,
            fact.tran_year
        """
        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query, (params))
            if rows:
                results = [dict(zip(column_names, row)) for row in rows]
                cache.set(cache_key, json.dumps(results),
                          timeout=CACHE_DATA_LIFETIME)
                return Response(results, status=status.HTTP_200_OK)
            else:
                return Response("customer not found", status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()
