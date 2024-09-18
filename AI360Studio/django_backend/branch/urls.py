from django.urls import path
from .views import GetBranch, GetBranchByCustomerId

urlpatterns = [
    # api's in use
    path('branch', GetBranch.as_view(), name='branch'),
    path('branch/<str:id>', GetBranchByCustomerId.as_view(), name='branch-by-id'),
]
