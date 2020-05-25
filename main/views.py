from django.shortcuts import render
from main.models import Background, Character, Snag, Bang

from django.http import JsonResponse

from django.core import serializers

# Create your views here.
def index(request):
    # character = Character.objects.last()
    # snag = Snag.objects.last()
    # bang = Bang.objects.last()
    character = Character.objects.last()
    # snags = list(Snag.objects.values())
    # # print(JsonResponse(snag, safe=False))
    # snags = JsonResponse(snags, safe=False)
    # bangs = list(Bang.objects.values())
    # # print(JsonResponse(snag, safe=False))
    # bangs = JsonResponse(bangs, safe=False)

    snags = Snag.objects.all()
    # print(serializers.serialize('json', snags))
    snags = str(serializers.serialize('json', snags))
    bangs = Bang.objects.all()
    # print(serializers.serialize('json', bangs))
    bangs = str(serializers.serialize('json', bangs))
    back = Background.objects.filter(active=True).last()
    return render(request, 'main/index.html', {
        'back': back,
        'character': character,
        'snags': snags,
        'bangs': bangs
    })


def profile(request):
    return render(request, 'main/profile.html', {})


def shop(request):
    return render(request, 'main/shop.html', {})
