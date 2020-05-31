from django.shortcuts import render, redirect
from main.models import Background, Character, Snag, Bang, Progress

from django.core import serializers

from django.contrib.auth.decorators import login_required

from .forms import UserForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

from django.http import HttpResponse


# Create your views here.
def index(request):
    if request.method == 'POST':
        if "lvl" in request.POST:
            if request.user.is_authenticated:
                request.user.progress.lvl = request.POST.get('lvl')
                request.user.progress.xp = request.POST.get('xp')
                request.user.progress.save()
            return HttpResponse()
        elif "getlvl" in request.POST:
            if request.user.is_authenticated:
                response = "{\"lvl\":\"" + str(request.user.progress.lvl)\
                           + "\",\"xp\":\"" + str(request.user.progress.xp)\
                           + "\"}"
            else:
                response = "{\"lvl\":\"1\",\"xp\":\"0\"}"
            return HttpResponse(response)
    else:
        if request.user.is_authenticated:
            character = Character.objects.get(id=request.user.preferences.character_id)
        else:
            character = Character.objects.filter(lvl=1).last()
        snags = Snag.objects.all()
        snags = str(serializers.serialize('json', snags))
        bangs = Bang.objects.all()
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
    if request.method == "POST":
        if "character_id" in request.POST:
            if Character.objects.get(id=request.POST.get("character_id")).lvl <= request.user.progress.lvl:
                request.user.preferences.character_id = request.POST.get("character_id")
                request.user.preferences.save()
                return HttpResponse("done")
            else:
                return HttpResponse("bad")
    else:
        back = Background.objects.filter(active=True).last()
        characters = Character.objects.all()
        return render(request, 'main/shop.html', {'back': back, 'characters': characters})


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
