import asyncio
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from .module.game import Game

import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
django.setup()
from api.models import User

class LocalGameConsumer(AsyncJsonWebsocketConsumer):
    @database_sync_to_async
    def getModel(self):
        return User.objects.get(intra_id=self.user.intra_id)
    
    @database_sync_to_async
    def setGameStatus(self, status):
        self.model.game_status = status
        self.model.save()

    async def connect(self):
        self.user = self.scope['user']
        if self.user.is_authenticated:
            self.model = await self.getModel()
            if self.model.game_status == True:
                await self.close()
                return
            await self.setGameStatus(True)
            await self.accept()
            self.game = Game()
            self.connected = True
            print('connected ' + self.model.intra_id + ': ' + str(self.model.game_status))
        else:
            await self.close()

    async def disconnect(self, close_code):
        await self.setGameStatus(False)
        print("disconnected " + self.model.intra_id + ": " + str(self.model.game_status))
        self.connected = False
        await self.close()

    async def receive_json(self, content, **kwargs):
        if 'ready' in content:
            print('ready')
            asyncio.ensure_future(self.send_periodic_message())
        else:
            self.game.set_state(content)

    async def send_periodic_message(self):
        while self.connected:
            self.game.update()
            await self.send_json(self.game.info())
            await asyncio.sleep(1 / 30)
