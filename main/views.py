from django.shortcuts import render
from main.models import Background


# Create your views here.
def index(request):
    back = Background.objects.filter(active=True).last()
    return render(request, 'main/index.html', {'back': back})


def profile(request):
    return render(request, 'main/profile.html', {})


def shop(request):
    return render(request, 'main/shop.html', {})
