import json

from channels.generic.websocket import WebsocketConsumer


class GameConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        name = text_data_json["name"]

        data = {
            "name": name,
            "greeting": "Hello, " + name + "!"
        }
        self.send(text_data=json.dumps(data))