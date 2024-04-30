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
        await self.accept()

    async def disconnect(self, close_code):
        if self.play:
            await self.setGameStatus(False)
        await self.close()

    async def check_auth(self):
        if not self.user.is_authenticated:
            await self.send_json({'gameOver': 'not authenticated'})
            return False
        return True

    async def check_game_status(self):
        self.model = await self.getModel()
        if self.model.game_status == True:
            await self.send_json({'gameOver': 'already in game'})
            return False
        return True

    async def receive_json(self, content, **kwargs):
        if 'ready' in content:
            if not await self.check_auth():
                return

            if not await self.check_game_status():
                return

            self.play = True
            await self.setGameStatus(True)
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
        await self.accept()

    async def disconnect(self, close_code):
        if self.play:
            await self.setGameStatus(False)

        if self in self.wait_player_list:
            self.wait_player_list.remove(self)

        # 연결이 끊겼을 때 상대방에게 연결이 끊겼다고 알림
        if self.game.winner == None and self.opponent != None:
            await self.opponent.send_json({ 'gameOver': 'disconnected'})
            self.opponent.opponent = None

        await self.close()

    async def check_auth(self):
        if not self.user.is_authenticated:
            await self.send_json({'gameOver': 'not authenticated'})
            return False
        return True

    async def check_game_status(self):
        self.model = await self.getModel()
        if self.model.game_status == True:
            await self.send_json({'gameOver': 'already in game'})
            return False
        return True

    async def make_game(self):
        self.opponent = self.wait_player_list.pop()
        self.opponent.opponent = self
        self.opponent.player.set_pos(1)
        self.player.set_pos(2)
        self.game = Game(self.opponent.player, self.player)
        self.opponent.game = self.game
        asyncio.ensure_future(self.send_periodic_message())

    async def receive_json(self, content, **kwargs):
        if 'ready' in content:
            if not await self.check_auth():
                return

            if not await self.check_game_status():
                return

            self.play = True
            await self.setGameStatus(True)
            self.player = Player(content['nickname'])
        
            if len(self.wait_player_list) == 0:
                self.wait_player_list.append(self)
            else:
                await self.make_game()

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

                # 승패에 따라 승리, 패배 횟수 업데이트
                if self.game.winner == self.player:
                    await self.addWin()
                    await self.opponent.addLose()
                else:
                    await self.addLose()
                    await self.opponent.addWin()
                return

            game_info = self.game.info()
            await self.send_and_opponent_json(game_info)
            await asyncio.sleep(1 / 30)

    async def send_and_opponent_json(self, data):
        await self.send_json(data)
        await self.opponent.send_json(data)

class TournamentGameConsumer(AsyncJsonWebsocketConsumer):
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
        await self.accept()
    
    async def disconnect(self, close_code):
        if self.play:
            await self.setGameStatus(False)
        
        if self in self.wait_player_list:
            self.wait_player_list.remove(self)

        # 연결이 끊겼을 때 상대방에게 연결이 끊겼다고 알림
        if self.game.winner == None and self.opponent != None:
            await self.opponent.send_json({ 'gameOver': 'disconnected'})
            self.opponent.opponent = None

        await self.close()

    async def check_auth(self):
        if not self.user.is_authenticated:
            await self.send_json({'gameOver': 'not authenticated'})
            return False
        return True

    async def check_game_status(self):
        self.model = await self.getModel()
        if self.model.game_status == True:
            await self.send_json({'gameOver': 'already in game'})
            return False
        return True

    async def make_game(self):
        self.opponent = self.wait_player_list.pop()
        self.opponent.opponent = self
        self.opponent.player.set_pos(1)
        self.player.set_pos(2)
        self.game = Game(self.opponent.player, self.player)
        self.opponent.game = self.game
        asyncio.ensure_future(self.send_periodic_message())

    async def receive_json(self, content, **kwargs):
        if 'ready' in content:
            if not await self.check_auth():
                return
            
            if not await self.check_game_status():
                return
            
            self.play = True
            await self.setGameStatus(True)
            self.player = Player(content['nickname'])

            if len(self.wait_player_list) == 3:
                await self.make_game()
                self.wait_player_list.pop().make_game()

            else:
                self.wait_player_list.append(self)

        else:
            if 'ArrowUp' in content:
                self.player.set_move_up(content['ArrowUp'])
            if 'ArrowDown' in content:
                self.player.set_move_down(content['ArrowDown'])

    async def send_periodic_message(self):
        pass