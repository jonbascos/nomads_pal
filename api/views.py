from Nomads_Pal_app.models import Location
from rest_framework import viewsets
from .serializers import LocationSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all().order_by('businessName')
    serializer_class = LocationSerializer