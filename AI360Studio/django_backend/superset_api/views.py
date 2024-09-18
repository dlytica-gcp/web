from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
import requests

# URLs
# base_url = 'http://superset.data-nature.dlytica.com:30088'
base_url = 'http://10.10.157.105:30088'
LOGIN_URL = f"{base_url}/api/v1/security/login"
GUEST_TOKEN_URL = f"{base_url}/api/v1/security/guest_token"
ROLES_URL = f"{base_url}/api/v1/me/roles"
REFRESH_TOKEN_URL = f"{base_url}/api/v1/security/refresh"
session = requests.session()
username = 'dlyticauser'
password = 'dlytica@D123#'

def call_login_url(username, password, provider, refresh):
    response = requests.post(LOGIN_URL, json={
        'username': username,
        'password': password,
        'provider': provider,
        'refresh': refresh,
    })
    return response.json()

def call_guest_token_url(token, resources, rls, user):
    response = requests.post(GUEST_TOKEN_URL, headers={
        'Authorization': f'Bearer {token}'
    }, json={
        'resources': resources,
        'rls': rls,
        'user': user,
    })
    return response.json()

def call_roles_url(token):
    response = session.get(ROLES_URL, headers={
        'Authorization': f'Bearer {token}'
    })
    return response.json()

def call_refresh_token_url(token):
    response = requests.post(REFRESH_TOKEN_URL, headers={
        'Authorization': f'Bearer {token}'
    })
    return response.json()

# @csrf_exempt
class GetGuestToken(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        try:
            data = request.data
            dashboard_id = data.get('dashboard_id')

            # Call the login URL to get the access token
            login_data = call_login_url(username, password, 'db', True)

            try:
                # Call the guest token URL to get the guest token
                guest_token_data = call_guest_token_url(
                    login_data['access_token'], 
                    [{'type': 'dashboard', 'id': dashboard_id}], 
                    [], 
                    {'first_name': "Datanature", 'last_name': "Admin", 'username': "dlyticauser"}
                )
            except Exception as e:
                # If the token is expired, refresh it
                if 'Token expired' in str(e):
                    refresh_data = call_refresh_token_url(login_data['access_token'])
                    # Then call the guest token URL again with the refreshed token
                    guest_token_data = call_guest_token_url(
                        refresh_data['access_token'], 
                        [{'type': 'dashboard', 'id': dashboard_id}], 
                        [], 
                        {'first_name': "Datanature", 'last_name': "Admin", 'username': "dlyticauser"}
                    )
                else:
                    raise e

            # Return the guest token in the response
            return Response({'token': guest_token_data['token']}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
