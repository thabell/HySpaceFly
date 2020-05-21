from django.db import models


# User
# info akk
# TODO
class Achievement(models.Model):
    pass  # maybe better move it as a field to User


# TODO
class Progress(models.Model):  # (set of Achievements)
    pass  # maybe better move it as a field to User


# Shop
# TODO TODO
class SaleItem(models.Model):
    pass


# Game
class Background(models.Model):  # cosmos
    preview = models.ImageField("Превью", upload_to="main/background")
    image_FHD = models.ImageField("Изображение FHD", upload_to="main/background", null=True, blank=True)
    has_FHD = models.BooleanField(default=False, null=True, blank=True)
    image_HD = models.ImageField("Изображение HD", upload_to="main/background", null=True, blank=True)
    has_HD = models.BooleanField(default=False, null=True, blank=True)
    image_LQ = models.ImageField("Изображение LQ", upload_to="main/background", null=True, blank=True)
    has_LQ = models.BooleanField(default=False, null=True, blank=True)
    active = models.BooleanField(default=False)

    def __str__(self):
        return "Фон"

    @classmethod
    def create(cls, preview, image_FHD, has_FHD, image_HD, has_HD, image_LQ, has_LQ, active):
        back = cls(preview=preview, image_FHD=image_FHD, has_FHD=has_FHD,
                   image_HD=image_HD, has_HD=has_HD, image_LQ=image_LQ, has_LQ=has_LQ, active=active)
        if back.image_FHD:
            back.has_FHD = True
        if back.image_HD:
            back.has_HD = True
        if back.image_LQ:
            back.has_LQ = True
        if back.active:
            for back_ in Background.objects.all():
                back_.active = False
        back.active = True
        return back


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
    # TODO TODO bang
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
    # TODO TODO animation_shot_list_bang
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
    # TODO TODO animation_bang
    # TODO TODO animation_rotation_forward
    # TODO TODO animation_rotation_backward
    # TODO TODO animation_rotation_left
    # TODO TODO animation_rotation_right
    pass


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

