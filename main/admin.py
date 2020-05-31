from django.contrib import admin
from main.models import Preferences, Achievement, Progress, SaleItem, Background, Character,\
    CharacterMoves, Skills, Snag, SnagMoves, Bang, Banner, Speech, EventConnections
from django.contrib.auth.models import User
# Register your models here.


@admin.register(Background)
class BackgroundAdmin(admin.ModelAdmin):
    list_display = ('id', 'active', 'preview', 'image_FHD', 'image_HD', 'image_LQ')


@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ('name', 'preview', 'id')


@admin.register(Snag)
class SnagAdmin(admin.ModelAdmin):
    list_display = ('name', 'preview')


@admin.register(Bang)
class BangAdmin(admin.ModelAdmin):
    list_display = ('name', 'preview')


class ProgressInline(admin.TabularInline):
    model = Progress


class PreferencesInline(admin.TabularInline):
    model = Preferences


admin.site.unregister(User)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    inlines = [ProgressInline, PreferencesInline]
