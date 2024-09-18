import re
from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserRegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'confirm_password', 'role')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError(
                {"confirm_password": "Password fields didn't match."}
            )
        return data
    
    def validate_username(self, value):
        value = value.strip()
        # Check for multiple consecutive spaces
        if re.search(r'\s{2,}', value):
            raise serializers.ValidationError("Username cannot have multiple consecutive spaces.")
        
        # Check for unwanted characters (this allows letters, numbers, spaces, and underscores)
        if not re.match(r'^[\w\s]+$', value):
            raise serializers.ValidationError("Username can only contain letters, numbers, spaces, and underscores.")
        
        return value

    def validate_password(self, value):
        if not (len(value) >= 8 and
                re.search(r"[a-z]", value) and
                re.search(r"[A-Z]", value) and
                re.search(r"\d", value)):
            raise serializers.ValidationError(
                "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
            )
        return value

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token
