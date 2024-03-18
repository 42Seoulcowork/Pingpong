from django.urls import path
from .views import UsersAPI, OauthAPI

urlpatterns = [
    path('users/', UsersAPI.as_view()),
    path('oauth/', OauthAPI.as_view()),
]