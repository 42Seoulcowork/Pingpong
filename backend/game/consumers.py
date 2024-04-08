import asyncio
from channels.generic.websocket import AsyncJsonWebsocketConsumer

class GameConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        self.connected = False

    async def receive_json(self, content, **kwargs):
        self.connected = True
        asyncio.ensure_future(self.send_periodic_message())

    async def send_periodic_message(self):
        while self.connected:
            message = {
                'ball' : [0, 5, 0],
                'p1' : [-13, 1, 0],
                'p2' : [13, 1, 0],
                'score' : [1, 2]
            }
            await self.send_json(message)
            await asyncio.sleep(1)