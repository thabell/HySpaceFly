from django.shortcuts import render, redirect
from main.models import Background, Character, Snag, Bang, Progress

from django.core import serializers

from django.contrib.auth.decorators import login_required

from .forms import UserForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login


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


@login_required(login_url='login')  # TODO убрать, когда появится идентификация пользователя по сессии анонимного юзера
def profile(request):
    user = request.user
    back = Background.objects.filter(active=True).last()
    return render(request, 'main/profile.html', {
        'user': user,
        'back': back
    })


def shop(request):
    back = Background.objects.filter(active=True).last()
    return render(request, 'main/shop.html', {'back': back})


def signup(request):
    back = Background.objects.filter(active=True).last()
    if request.method == 'POST':
        user_form = UserForm(request.POST)
        if user_form.is_valid():
            new_user = User.objects.create_user(user_form.cleaned_data['username'], user_form.cleaned_data['email'], user_form.cleaned_data['password'])

            progress = Progress.create(new_user)
            progress.save()

            user = authenticate(
                username=user_form.cleaned_data['username'],
                password=user_form.cleaned_data['password']
            )
            if user is not None:
                login(request, user)
            else:
                print('User login failed')
            return redirect('../main/')
    else:
        user_form = UserForm()
    return render(request, 'registration/signup.html', {
        'user_form': user_form,
        'back': back
    })
