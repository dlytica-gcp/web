from rest_framework import serializers
from .models import Audience
from authentication.models import CustomUser


class AudienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audience
        fields = '__all__'

    def validate(self, data):
        user = data.get('user')
        name = data.get('name')
        customer_type = data.get('customer_type')

        if Audience.objects.filter(user=user, name=name, customer_type=customer_type).exists():
            raise serializers.ValidationError({
                "error": "An audience with the same user, name, and customer type already exists."
            })

        return data
