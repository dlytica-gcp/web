from django.urls import path
from .views import GetGuestToken

urlpatterns = [
    path('guest-token', GetGuestToken.as_view(), name='get_guest_token'),
]
