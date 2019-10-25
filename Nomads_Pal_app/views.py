from django.views.generic import ListView,TemplateView

from .models import Location, Profile

class HomePageView(ListView):
    model = Location
    template_name = 'index.html'
    context_object_name = 'location_info'

class ResultsPageView(TemplateView):
    model = Location
    template_name = 'results.html'
    
class AddNewPageView(TemplateView):
    model = Location
    template_name = 'addNew.html'
    success_url = 'home'
