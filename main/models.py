from django.db import models


# User
# info akk
class Achievement(models.Model):
    pass  # maybe better move it as a field to User


class Progress(models.Model):  # (set of Achievements)
    pass  # maybe better move it as a field to User


# Shop
class SaleItem(models.Model):
    pass


# Game
class Banner(models.Model):
    pass


class Moves(models.Model):  # (up down flying bang) ajax or js in html
    # anim, change_in_koords, hot_keys, cursor_events
    pass


class Skills(models.Model):  # anim, change_in_koords, hot_keys, button_preview
    pass


class EventConnections(models.Model):  # or move this to frontend
    """If obj1.koord1 == obj2.koord2: do smth"""
    pass


class Character(models.Model):  # square, plane, human
    pass  # square


class Plane(Character):
    pass


class Human(Character):
    pass


class Snag(models.Model):  # meteorite star circle another_plane
    pass  # circle


class Meteorite(Snag):
    pass


class Star(Snag):
    pass


class Speech(models.Model):
    pass


class Background(models.Model):  # cosmos
    pass
