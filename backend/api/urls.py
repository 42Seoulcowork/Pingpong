from django.urls import path
from .views import OauthAPI, MeAPI, SessionAPI, TestAPI, LogoutAPI, TestAPI1, TestAPI2, TestAPI3

urlpatterns = [
    path('oauth/', OauthAPI.as_view()),
    path('me/', MeAPI.as_view()),
    path('test/', TestAPI.as_view()),
    path('test1/', TestAPI1.as_view()),
    path('test2/', TestAPI2.as_view()),
    path('test3/', TestAPI3.as_view()),
    path('session/', SessionAPI.as_view()),
    path('logout/', LogoutAPI.as_view()),
]