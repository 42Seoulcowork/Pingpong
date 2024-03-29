import json
from channels.generic.websocket import AsyncWebsocketConsumer

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        name = text_data_json["name"]

        data = {
            "name": name,
            "greeting": "Hello, " + name + "!"
        }
        await self.send(text_data=json.dumps(data))