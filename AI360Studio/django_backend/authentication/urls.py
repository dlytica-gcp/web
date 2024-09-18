from django.urls import path
from .views import Home, UserRegistrationAPIView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', UserRegistrationAPIView.as_view(), name='api_signup'),
    path('home/', Home.as_view()),
]
