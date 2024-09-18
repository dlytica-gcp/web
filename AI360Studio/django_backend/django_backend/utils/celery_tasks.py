from celery import shared_task
from django.core.cache import cache
import json
from django_backend.trinodb_conn import TrinoDbConnection

@shared_task
def fetch_and_cache_individual_statistics(cache_key, query, params):
    trino_conn = TrinoDbConnection()
    try:
        rows, column_names = trino_conn.execute_query(query, params)
        if rows:
            individual_customers = [
                add_age_to_customer(dict(zip(column_names, row))) for row in rows
            ]
            cache.set(cache_key, json.dumps(individual_customers), timeout=86400)  # 1 day timeout
            return individual_customers
        return None
    except Exception as e:
        return {"error": str(e)}
    finally:
        trino_conn.close()

def add_age_to_customer(customer):
    cust_dob = customer.get('cust_dob')
    if cust_dob:
        try:
            dob_datetime = datetime.strptime(cust_dob, '%Y-%m-%dT%H:%M:%S.%f')
        except ValueError:
            dob_datetime = datetime.strptime(cust_dob, '%Y-%m-%dT%H:%M:%S')
        age = calculate_age(dob_datetime)
        customer['age'] = age
    return customer

def calculate_age(dob):
    today = datetime.today()
    age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    return age
