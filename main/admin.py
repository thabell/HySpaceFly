from django.contrib import admin
from main.models import Preferences, Achievement, Progress, SaleItem, Background, Character,\
    CharacterMoves, Skills, Snag, SnagMoves, Banner, Speech, EventConnections

# Register your models here.


@admin.register(Background)
class BackgroundAdmin(admin.ModelAdmin):
    list_display = ('id', 'active', 'preview', 'image_FHD', 'image_HD', 'image_LQ')


@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ('name', 'preview')


@admin.register(Snag)
class SnagAdmin(admin.ModelAdmin):
    list_display = ('name', 'preview')
