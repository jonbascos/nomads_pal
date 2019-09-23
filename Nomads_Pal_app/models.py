from django.db import models

class Location(models.Model):
    businessName = models.CharField(max_length=100)
    locationPhoto = models.ImageField(upload_to='images/location', null = True, blank = True)
    locationAddress = models.CharField(max_length=200)
    locationCity = models.CharField(max_length=100, default='Oregon City')
    locationState = models.CharField(max_length=3, default='OR')
    locationZipCode = models.CharField(max_length=10, default='97045')
    phoneNumber = models.CharField(max_length=15)
    websiteUrl = models.URLField()
    storeHours = models.CharField(max_length=200)
    uploadSpeed = models.CharField(max_length=4, null = True, blank = True)
    downloadSpeed = models.CharField(max_length=4, null = True, blank = True)

    def __str__(self):
        return self.businessName

class Profile(models.Model):
    name = models.CharField(max_length=100)
    profilePhoto = models.ImageField(upload_to='images/profile')
    homeLocation = models.CharField(max_length=200)

    def __str__(self):
        return self.name


