from django.shortcuts import render
from main.models import Background, Character, Snag


# Create your views here.
def index(request):
    character = Character.objects.last()
    snag = Snag.objects.last()
    back = Background.objects.filter(active=True).last()
    return render(request, 'main/index.html', {
        'back': back,
        'character': character,
        'snag': snag
    })


def profile(request):
    return render(request, 'main/profile.html', {})


def shop(request):
    return render(request, 'main/shop.html', {})
