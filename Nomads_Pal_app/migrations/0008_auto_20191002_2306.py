# Generated by Django 2.2.5 on 2019-10-03 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Nomads_Pal_app', '0007_auto_20191002_1201'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='locationPhoto',
            field=models.ImageField(blank=True, null=True, upload_to='images/location'),
        ),
    ]