from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'main/index.html', {})

def profile(request):
    return render(request, 'main/profile.html', {})

def shop(request):
    return render(request, 'main/shop.html', {})