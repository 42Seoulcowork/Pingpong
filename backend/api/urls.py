from django.urls import path
from .views import UsersAPI, OauthAPI, MeAPI, SessionAPI, TestAPI, LogoutAPI

urlpatterns = [
    path('oauth/', OauthAPI.as_view()),
    path('users/', UsersAPI.as_view()),
    path('me/', MeAPI.as_view()),
    path('test/', TestAPI.as_view()),
    path('session/', SessionAPI.as_view()),
    path('logout/', LogoutAPI.as_view()),
]