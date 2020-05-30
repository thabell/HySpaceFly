from django.db import models
from django.contrib.auth.models import User

# User
# info akk
# TODO
class Preferences(models.Model):
    pass  # maybe better move it as a field to User


# TODO
class Achievement(models.Model):
    pass  # maybe better move it as a field to User


# TODO
class Progress(models.Model):  # (set of Achievements)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="progress")
    lvl = models.IntegerField("Уровень")
    xp = models.IntegerField("Опыт")

    @classmethod
    def create(cls, user, lvl=1, xp=0):
        prog = cls(user=user, lvl=lvl, xp=xp)
        return prog


# Shop
# TODO TODO
class SaleItem(models.Model):
    pass


# Game
class Background(models.Model):  # cosmos
    preview = models.ImageField("Превью", upload_to="main/background")
    image_FHD = models.ImageField("Изображение FHD", upload_to="main/background", null=True, blank=True)
    image_HD = models.ImageField("Изображение HD", upload_to="main/background", null=True, blank=True)
    image_LQ = models.ImageField("Изображение LQ", upload_to="main/background", null=True, blank=True)
    active = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Фон"
        verbose_name_plural = "Фоны"

    def __str__(self):
        return "Фон"
    # не работает
    # @classmethod
    # def create(cls, preview, image_FHD, image_HD, image_LQ, active):
    #     back = cls(preview=preview, image_FHD=image_FHD,
    #                image_HD=image_HD, image_LQ=image_LQ, active=active)
    #     if back.active:
    #         for back_ in Background.objects.all():
    #             back_.active = False
    #     back.active = True
    #     return back


class Character(models.Model):  # square, plane, human
    name = models.CharField("Название", max_length=50)
    preview = models.ImageField("Превью", upload_to="main/character/preview")
    # TODO animation_shot_list_up
    # TODO animation_shot_list_down
    # TODO animation_shot_list_left
    # TODO animation_shot_list_right
    # TODO TODO animation_shot_list_bang
    # TODO TODO animation_shot_list_up_left
    # TODO TODO animation_shot_list_up_right
    # TODO TODO animation_shot_list_down_left
    # TODO TODO animation_shot_list_down_right

    def __str__(self):
        return "Персонаж " + str(self.name)

# TODO
class CharacterMoves(models.Model):  # (up down flying bang) ajax or js in html
    # anim, change_in_koords, hot_keys, cursor_events
    # TODO up
    # TODO down
    # TODO right
    # TODO left
    # TODO bang
    # TODO TODO up_left
    # TODO TODO up_right
    # TODO TODO down_left
    # TODO TODO down_right
    pass


# TODO
class Skills(models.Model):  # anim, change_in_koords, hot_keys, button_preview
    pass


class Snag(models.Model):  # meteorite star circle another_plane
    name = models.CharField("Название", max_length=50)
    preview = models.ImageField("Превью", upload_to="main/snag/preview")
    # TODO animation_shot_list_forward_left
    # TODO animation_shot_list_forward_right
    # TODO animation_shot_list_forward_middle
    # TODO animation_shot_list_bang
    # TODO TODO animation_shot_list_rotation_forward
    # TODO TODO animation_shot_list_rotation_backward
    # TODO TODO animation_shot_list_rotation_left
    # TODO TODO animation_shot_list_rotation_right

    def __str__(self):
        return "Препятствие " + str(self.name)


# TODO
class SnagMoves(models.Model):
    # TODO animation_forward_left
    # TODO animation_forward_right
    # TODO animation_forward_middle
    # TODO animation_bang
    # TODO TODO animation_rotation_forward
    # TODO TODO animation_rotation_backward
    # TODO TODO animation_rotation_left
    # TODO TODO animation_rotation_right
    pass


class Bang(models.Model):  # meteorite star circle another_plane
    name = models.CharField("Название", max_length=50)
    preview = models.ImageField("Превью", upload_to="main/bang/preview")
    # TODO animation_acivate

    def __str__(self):
        return "Взрыв " + str(self.name)


# TODO
class Banner(models.Model):
    pass


# TODO
class Speech(models.Model):
    pass


# TODO
class EventConnections(models.Model):  # or move this to frontend
    """If obj1.koord1 == obj2.koord2: do smth"""
    pass

