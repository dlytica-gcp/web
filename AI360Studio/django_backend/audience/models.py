from django.db import models
import uuid

class Audience(models.Model):
    class Meta:
        db_table = 'Audience'
        
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class CustomerType(models.TextChoices):
        INDIVIDUAL = 'individual', 'Individual'
        LEGAL = 'legal', 'Legal'
    
    class Gender(models.TextChoices):
        MALE = 'male', 'Male'
        FEMALE = 'female', 'Female'
    
    class RiskRating(models.TextChoices):
        LOW = 'low', 'Low'
        MEDIUM = 'medium', 'Medium'
        HIGH = 'high', 'High'
    
    class Status(models.TextChoices):
        ACTIVE = 'active', 'Active'
        DORMANT = 'dormant', 'Dormant'
    
    name = models.CharField(max_length=255)
    
    customer_type = models.CharField(
        max_length=10,
        choices=CustomerType.choices,
        default=CustomerType.INDIVIDUAL,
    )
    gender = models.CharField(
        max_length=10,
        choices=Gender.choices,
        default=Gender.MALE,
    )
    risk_rating = models.CharField(
        max_length=7,
        choices=RiskRating.choices,
        default=RiskRating.LOW,
    )
    status = models.CharField(
        max_length=8,
        choices=Status.choices,
        default=Status.ACTIVE,
    )
    average_deposit = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0.00
    )
    
    user = models.ForeignKey(
        'authentication.CustomUser',
        on_delete=models.CASCADE,
        related_name='audiences',
        null=False,
        blank=False
    )

