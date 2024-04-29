from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path("ws/local/", consumers.LocalGameConsumer.as_asgi()),
    re_path("ws/remote/", consumers.RemoteGameConsumer.as_asgi()),
]