# Generated by Django 2.2.5 on 2019-09-29 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Nomads_Pal_app', '0004_auto_20190929_1425'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='locationPhoto',
            field=models.ImageField(default='media/images/location/default_image.png', upload_to='media/images/location'),
        ),
    ]