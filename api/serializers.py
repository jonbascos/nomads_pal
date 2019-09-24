from Nomads_Pal_app.models import Location
from rest_framework import serializers

class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'businessName', 'locationPhoto', 'locationAddress', 'locationCity', 'locationState', 'locationZipCode', 'phoneNumber', 'websiteUrl', 'storeHours', 'uploadSpeed', 'downloadSpeed']
        read_only_fields = ['id']