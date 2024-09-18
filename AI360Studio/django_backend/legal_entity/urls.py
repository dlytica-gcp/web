from django.urls import path
from .views import GetLegalInfo, GetLegalInfoById, GetLegalDetailsInfo, GetTotalLegalTransactionBranchYTD

urlpatterns = [
    # api's in use
    path('legal_info', GetLegalInfo.as_view(),
         name='legal-info'),
    path('legal_info/<str:id>', GetLegalInfoById.as_view(),
         name='legal-info-by-id'),
    path('legal_details_info/<str:id>', GetLegalDetailsInfo.as_view(),
         name='legal-details-info-by-id'),
    path('legal_trans_branch_ytd', GetTotalLegalTransactionBranchYTD.as_view(),
         name='legal-trans-branch-ytd'),
]
