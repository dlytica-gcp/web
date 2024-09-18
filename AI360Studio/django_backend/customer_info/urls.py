from django.urls import path
from .views import  GetIndividualInfo, GetIndividualInfoById, GetAccountInfo, GetFactCustomerInfo, GetJoinedCustomerAccountInfo, GetDim_Dam, GetIndividualStatistics, GetIndividualDetailsInfo, GetTotalTransactionBranchYTD, Test, TestByID

urlpatterns = [
    # api's in use
#     path('individual_info', GetIndividualInfo.as_view(), name='individual-info'),
    path('individual_info', GetIndividualInfoById.as_view(),
         name='individual-info-by-id'),
    path('individual_statistics', GetIndividualStatistics.as_view(),
         name='individual-statistics'),
    path('details_info/<str:id>',
         GetIndividualDetailsInfo.as_view(), name='combine-info'),
    path('get_total_transaction_branch_ytd', GetTotalTransactionBranchYTD.as_view(),
         name='total-transaction-branch'),

    # test api's
    path('account_info/<str:id>', GetAccountInfo.as_view(),
         name='detail-info'),
    path('fact_customer_info', GetFactCustomerInfo.as_view(),
         name='fact-customer-info'),
    path('dim_dam', GetDim_Dam.as_view(),
         name='fact-customer-info'),
    path('join_data', GetJoinedCustomerAccountInfo.as_view(),
         name='join-data'),
    path('test', Test.as_view(),
         name='test'),
    path('test/<str:id>', TestByID.as_view(),
         name='test-by-id'),
]
