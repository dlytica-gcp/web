import json
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_backend.trinodb_conn import TrinoDbConnection
from .serializers import AudienceSerializer
from .models import Audience


class TestView(APIView):
    def get(self, request):
        try:
            trino_db = TrinoDbConnection()
            query = "select * from customer"
            rows = trino_db.execute_query(query)
            if not rows:
                return Response({"error": "Error fetching data"}, status=500)
            return Response(rows, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    def post(self, request):
        try:
            data = request.data
            email = data.get('email')
            password = data.get('password')
            if email and password:
                return Response({"message": "Data received!"}, status=201)
            else:
                return Response({"error": "Email and password are required."}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class CreateAudienceView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            data = request.data
            data['user'] = user.id
            serializer = AudienceSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class GetAudienceView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, uuid):
        try:
            audience = Audience.objects.get(id=uuid, user=request.user)
            serializer = AudienceSerializer(audience)
            return Response(serializer.data, status=200)
        except Audience.DoesNotExist:
            return Response({"error": "Audience not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class GetAudiencesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            if user.role == 'admin':
                audiences = Audience.objects.filter(user=request.user)
                serializer = AudienceSerializer(audiences, many=True)
                return Response(serializer.data, status=200)
            return Response({"error": "You do not have permission to view this data."}, status=403)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class UpdateAudienceView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, uuid):
        try:
            audience = Audience.objects.get(id=uuid, user=request.user)
            data = request.data
            serializer = AudienceSerializer(audience, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        except Audience.DoesNotExist:
            return Response({"error": "Audience not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class DeleteAudienceView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, uuid):
        try:
            audience = Audience.objects.get(id=uuid, user=request.user)
            audience.delete()
            return Response({"message": "Audience deleted successfully"}, status=204)
        except Audience.DoesNotExist:
            return Response({"error": "Audience not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
