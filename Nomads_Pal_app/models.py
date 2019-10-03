from django.db import models

class Location(models.Model):
    businessName = models.CharField(max_length=100)
    locationPhoto = models.ImageField(upload_to='images/location', null=True, blank=True)
    locationAddress = models.CharField(max_length=200)
    locationCity = models.CharField(max_length=100, default='City')
    locationState = models.CharField(max_length=5, default='State')
    locationZipCode = models.CharField(max_length=20, default='Zip/Postal')
    phoneNumber = models.CharField(max_length=15, null = True, blank = True)
    websiteUrl = models.URLField(null = True, blank = True)
    storeHours = models.CharField(max_length=200, null = True, blank = True)
    uploadSpeed = models.CharField(max_length=15, default='Not Available')
    downloadSpeed = models.CharField(max_length=15, default='Not Available')

    def __str__(self):
        return self.businessName

class Profile(models.Model):
    name = models.CharField(max_length=100)
    profilePhoto = models.ImageField(upload_to='images/profile')
    homeLocation = models.CharField(max_length=200)

    def __str__(self):
        return self.name


