from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_backend.trinodb_conn import TrinoDbConnection
from django.core.cache import cache
from rest_framework.permissions import AllowAny
from django_backend.utils.cache_utils import get_nepal_cache_lifetime

CACHE_DATA_LIFETIME=get_nepal_cache_lifetime()

# TODO remove permission classes after POC
# api in use
class GetBranch(APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        # cache_key = 'branch_hierarchy'
        # cached_data = cache.get(cache_key)
        # if cached_data:
        #     return Response(cached_data, status=status.HTTP_200_OK)
        query = """
        SELECT 
            hub_name,
            sub_provincial,
            city_code,
            branch_description
        FROM gold_dimensions.dim_branch
        """
        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query)

            # Create a dictionary to maintain hierarchy
            hierarchy = {}
            for row in rows:
                hub_name, sub_provincial, city_code, branch_description = row

                if hub_name not in hierarchy:
                    hierarchy[hub_name] = {}

                if sub_provincial not in hierarchy[hub_name]:
                    hierarchy[hub_name][sub_provincial] = {}

                if city_code not in hierarchy[hub_name][sub_provincial]:
                    hierarchy[hub_name][sub_provincial][city_code] = []

                hierarchy[hub_name][sub_provincial][city_code].append({
                    'branch_description': branch_description
                })

            # Convert the dictionary to a list of dictionaries
            result = []
            for hub_name, sub_provincials in hierarchy.items():
                sub_provincial_list = []
                for sub_provincial, cities in sub_provincials.items():
                    city_list = []
                    for city_code, branches in cities.items():
                        city_list.append({
                            'city_code': city_code,
                            'branches': branches
                        })
                    sub_provincial_list.append({
                        'sub_provincial': sub_provincial,
                        'cities': city_list
                    })
                result.append({
                    'hub_name': hub_name,
                    'sub_provinces': sub_provincial_list
                })
            # cache.set(cache_key, result, timeout=CACHE_DATA_LIFETIME)
            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        finally:
            trino_conn.close()

# not used
class GetBranchByCustomerId(APIView):
    def get(self, request):
        query = """
        SELECT
            b.bank_id, b.sol_desc from dimensions.dim_branch as b
            join dimensions.dim_individual_customer as i on i.primary_sol_id=b.bank_id
            where i.c_id = ?
        """
        trino_conn = TrinoDbConnection()
        try:
            rows, column_names = trino_conn.execute_query(query, (id,))
            customers_accounts = [dict(zip(column_names, row)) for row in rows]
            return Response(customers_accounts, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            trino_conn.close()
