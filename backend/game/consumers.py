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
            await self.accept()
            print('connected ' + self.model.intra_id + ': ' + str(self.model.game_status))
        else:
            await self.close()

    async def disconnect(self, close_code):
        if self.play:
            await self.setGameStatus(False)
        print("disconnected " + self.model.intra_id + ": " + str(self.model.game_status))
        await self.close()

    async def receive_json(self, content, **kwargs):
        if 'ready' in content:
            if self.model.game_status == True:
                await send_json({'gameOver': 'error', 'reason': 'already in game'})
            self.play = True
            self.p1 = Player(content['p1'])
            self.p1.set_pos(1)
            self.p2 = Player(content['p2'])
            self.p2.set_pos(2)
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


class RemoteGameConsumer(AsyncJsonWebsocketConsumer):
    wait_player_list = []
    @database_sync_to_async
    def getModel(self):
        return User.objects.get(intra_id=self.user.intra_id)

    @database_sync_to_async
    def setGameStatus(self, status):
        self.model.game_status = status
        self.model.save()

    @database_sync_to_async
    def addWin(self):
        self.model.win += 1
        self.model.save()
    
    @database_sync_to_async
    def addLose(self):
        self.model.lose += 1
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
        else:
            await self.close()

    async def disconnect(self, close_code):
        await self.setGameStatus(False)
        if self in self.wait_player_list:
            self.wait_player_list.remove(self)

        if self.game.winner == None and self.opponent != None:
            await self.opponent.send_json({ 'gameOver': 'error', 'reason': 'opponent disconnected'})
            self.opponent.opponent = None
        elif self.game.winner == self.player.id:
            await self.addWin()
        elif self.game.winner == self.opponent.player.id:
            await self.addLose()

        print("disconnected " + self.model.intra_id + ": " + str(self.model.game_status))
        await self.close()

    async def receive_json(self, content, **kwargs):
        if 'ready' in content:
            if len(self.wait_player_list) == 0:
                self.player = Player(content['nickname'])
                self.wait_player_list.append(self)
            else:
                self.player = Player(content['nickname'])
                self.opponent = self.wait_player_list.pop()
                self.opponent.opponent = self
                self.opponent.player.set_pos(1)
                self.player.set_pos(2)
                self.game = Game(self.opponent.player, self.player)
                self.opponent.game = self.game
                asyncio.ensure_future(self.send_periodic_message())
        else:
            if 'ArrowUp' in content:
                self.player.set_move_up(content['ArrowUp'])
            if 'ArrowDown' in content:
                self.player.set_move_down(content['ArrowDown'])

    async def send_periodic_message(self):
        while True:
            if self.game.update() == GAME_OVER:
                finish_info = self.game.finish_info()
                await self.send_and_opponent_json(finish_info)
                return
            game_info = self.game.info()
            await self.send_and_opponent_json(game_info)
            await asyncio.sleep(1 / 30)

    async def send_and_opponent_json(self, data):
        await self.send_json(data)
        await self.opponent.send_json(data)