# Generated by Django 2.2.5 on 2019-09-23 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Nomads_Pal_app', '0002_auto_20190923_1226'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='locationCity',
            field=models.CharField(default='City', max_length=100),
        ),
        migrations.AlterField(
            model_name='location',
            name='locationState',
            field=models.CharField(default='State', max_length=5),
        ),
        migrations.AlterField(
            model_name='location',
            name='locationZipCode',
            field=models.CharField(default='Zip/Postal', max_length=20),
        ),
    ]
