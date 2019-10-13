from Nomads_Pal_app.models import Location
from rest_framework import viewsets
from .serializers import LocationSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all().order_by('businessName')
    serializer_class = LocationSerializer 

    def get_queryset(self):
        queryset = Location.objects.all()
        locationCity = self.request.query_params.get('locationCity', None)
        locationState = self.request.query_params.get('locationState', None)
        if locationCity is not None and locationState is not None:
            queryset = queryset.filter(locationCity=locationCity, locationState=locationState)
        return queryset