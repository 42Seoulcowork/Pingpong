import asyncio
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from .module.game import Game
from .module.player import Player
from .module.enum import GAME_OVER

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
            print('connected ' + self.model.intra_id + ': ' + str(self.model.game_status))
        else:
            await self.close()

    async def disconnect(self, close_code):
        await self.setGameStatus(False)
        print("disconnected " + self.model.intra_id + ": " + str(self.model.game_status))
        await self.close()

    async def receive_json(self, content, **kwargs):
        if 'ready' in content:
            self.p1 = Player(content['p1'], 1)
            self.p2 = Player(content['p2'], 2)
            self.game = Game(self.p1, self.p2)
            asyncio.ensure_future(self.send_periodic_message())
        else:
            if 'w' in content:
                self.p1.set_move_up(content['w'])
            if 's' in content:
                self.p1.set_move_down(content['s'])
            if 'ArrowUp' in content:
                self.p2.set_move_up(content['ArrowUp'])
            if 'ArrowDown' in content:
                self.p2.set_move_down(content['ArrowDown'])

    async def send_periodic_message(self):
        while True:
            if self.game.update() == GAME_OVER:
                await self.send_json(self.game.finish_info())
                return
            await self.send_json(self.game.info())
            await asyncio.sleep(1 / 30)
