from django.views.generic import ListView,DetailView

from .models import Location, Profile

class HomePageView(ListView):
    model = Location
    template_name = 'index.html'
    context_object_name = 'location_info'

class ResultsPageView(DetailView):
    model = Location
    template_name = 'results.html'

class AddNewPageView(ListView):
    model = Location
    template_name = 'addNew.html'
