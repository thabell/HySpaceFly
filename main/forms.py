from django import forms
from django.contrib.auth.models import User


class UserForm(forms.ModelForm):
    password = forms.CharField(label="Пароль:", widget=forms.PasswordInput)
    password_double = forms.CharField(label="Повторно пароль:", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('username', 'password', 'password_double', 'email')

    def clean(self):
        cleaned_data = super().clean()
        passw = cleaned_data['password']
        passw_doub = cleaned_data['password_double']
        if passw != passw_doub:
            raise forms.ValidationError("Пароли не совпадают")
        return cleaned_data