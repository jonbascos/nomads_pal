from django.views.generic import ListView

from .models import Location, Profile

class HomePageView(ListView):
    model = Location
    template_name = 'index.html'
    context_object_name = 'location_info'

class ResultsPageView(ListView):
    model = Location
    template_name = 'results.html'

class AddNewPageView(ListView):
    model = Location
    template_name = 'addNew.html'
