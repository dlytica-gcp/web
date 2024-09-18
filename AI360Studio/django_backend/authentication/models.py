from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
import uuid

class CustomUser(AbstractUser):
    class Meta:
       pass
        
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # GENDER_CHOICES = (
    #     ('M', 'Male'),
    #     ('F', 'Female'),
    #     ('O', 'Other'),
    # )

    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )
    username = models.CharField(
        max_length=150,
        unique=True,
        null=False,
        blank=False,
    )
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=10, choices=ROLE_CHOICES, default='user')

    # Set related_name to avoid clashes with built-in User model
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )

    REQUIRED_FIELDS = ['email', 'role']
    
