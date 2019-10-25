
from django.urls import path

from .views import HomePageView, ResultsPageView, AddNewPageView
 
urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('results/', ResultsPageView.as_view(), name='results'),
    path('addNew/', AddNewPageView.as_view(), name='addNew'), 
]
