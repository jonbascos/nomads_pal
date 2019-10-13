from django.urls import include, path
from rest_framework import routers
from . import views
 
router = routers.DefaultRouter()
router.register(r'location', views.LocationViewSet)
router.register(r'location(?P<locationCity>.+)(?P<locationState>.+)/$', views.LocationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]