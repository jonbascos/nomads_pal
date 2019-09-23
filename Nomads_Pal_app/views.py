from django.views.generic import TemplateView

from .models import Location, Profile

class HomePageView(TemplateView):
    model = Location
    template_name = 'index.html'
