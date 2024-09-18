from django.urls import path
from .views import TestView, CreateAudienceView, GetAudienceView, GetAudiencesView, UpdateAudienceView, DeleteAudienceView

urlpatterns = [
    path('test/', TestView.as_view(), name='test'),
    path('audience', CreateAudienceView.as_view()),
    path('audience/', GetAudiencesView.as_view()),
    path('audience/<uuid:uuid>', GetAudienceView.as_view()),
    path('audience/update/<uuid:uuid>', UpdateAudienceView.as_view()),
    path('audience/delete/<uuid:uuid>', DeleteAudienceView.as_view()),
]
