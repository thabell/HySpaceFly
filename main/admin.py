from django.contrib import admin
from main.models import Achievement, Progress, SaleItem, Background, Character,\
    CharacterMoves, Skills, Snag, SnagMoves, Banner, Speech, EventConnections

# Register your models here.


@admin.register(Background)
class BackgroundAdmin(admin.ModelAdmin):
    list_display = ('preview', 'image_FHD', 'has_FHD', 'image_HD', 'has_HD', 'image_LQ', 'has_LQ')


@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ('name', 'preview')


@admin.register(Snag)
class SnagAdmin(admin.ModelAdmin):
    list_display = ('name', 'preview')
