import asyncio
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from .module.game import Game
from .module.player import Player
from .module.enum import GAME_OVER
from .module.round import Round

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
        if hasattr(self, 'game'):
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

            self.p1 = Player(content['p1'])
            self.p1.set_pos(1)
            self.p2 = Player(content['p2'])
            self.p2.set_pos(2)
            self.game = Game(self.p1, self.p2)
            await self.setGameStatus(True)
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


class RemoteGameConsumer(LocalGameConsumer):
    wait_player_list = []

    @database_sync_to_async
    def addWin(self):
        self.model.win += 1
        self.model.save()
    
    @database_sync_to_async
    def addLose(self):
        self.model.lose += 1
        self.model.save()

    async def disconnect(self, close_code):
        if hasattr(self, 'player'):
            await self.setGameStatus(False)

        if self in self.wait_player_list:
            self.wait_player_list.remove(self)

        # 게임 시작 후 연결이 끊겼을 때 상대방에게 연결이 끊겼다고 알림
        if hasattr(self, 'game') and self.game.status == 'playing':
            await self.opponent.send_json({ 'gameOver': 'disconnected'})
            self.game.status = 'end'

        await self.close()

    async def make_game(self, opponent):
        self.opponent = opponent
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

            self.player = Player(content['nickname'])
            await self.setGameStatus(True)
        
            if len(self.wait_player_list) < 1:
                self.wait_player_list.append(self)
                return

            await self.make_game(self.wait_player_list.pop())

        else:
            if 'ArrowUp' in content:
                self.player.set_move_up(content['ArrowUp'])
            if 'ArrowDown' in content:
                self.player.set_move_down(content['ArrowDown'])

    async def send_game_over(self):
        await self.send_game_data(self.game.finish_info())

    async def save_game_result(self):
        if self.game.winner == self.player:
            await self.addWin()
            await self.opponent.addLose()
        else:
            await self.addLose()
            await self.opponent.addWin()

    async def send_periodic_message(self):
        while True:
            if self.game.status == 'end':
                return
            if self.game.update() == GAME_OVER:
                await self.send_game_over()
                await self.save_game_result()
                self.game.status = 'end'
                return

            await self.send_game_data(self.game.info())
            await asyncio.sleep(1 / 30)

    async def send_game_data(self, data):
        await self.send_json(data)
        await self.opponent.send_json(data)

class TournamentGameConsumer(RemoteGameConsumer):
    async def disconnect(self, close_code):
        if hasattr(self, 'player'):
            await self.setGameStatus(False)
        
        if self in self.wait_player_list:
            self.wait_player_list.remove(self)

        # 연결이 끊겼을 때 상대방에게 연결이 끊겼다고 알림
        if hasattr(self, 'game') and self.game.status == 'playing':
            await self.opponent.send_json({ 'gameOver': 'disconnected'})
            self.game.status = 'end'

        # 비정상적으로 토너먼트 라운드가 종료되었을 때
        if hasattr(self, 'round') and self.round.status == 'playing':
            for round in self.round_list:
                round.status = 'end'
                if round != self.round:
                    await round.consumer1.send_json({'gameOver': 'disconnected'})
                    await round.consumer2.send_json({'gameOver': 'disconnected'})

        # 다음 경기 대기 중에 연결이 끊어졌을 때
        if hasattr(self, 'final_player_list') and self in self.final_player_list:
            self.final_player_list.remove(self)
            await self.final_player_list.pop().send_json({'gameOver': 'disconnected'})

        await self.close()

    async def make_round(self, opponent):
        await self.make_game(opponent)
        self.round = Round(self.opponent, self)
        self.opponent.round = self.round
        return self.round

    async def receive_json(self, content, **kwargs):
        if 'ready' in content:
            if not await self.check_auth():
                return

            if not await self.check_game_status():
                return

            self.player = Player(content['nickname'])
            self.is_final_game = False
            await self.setGameStatus(True)
            
            if len(self.wait_player_list) < 3:
                self.wait_player_list.append(self)
                return
            
            round2 = await self.make_round(self.wait_player_list.pop())
            round1 = await self.wait_player_list.pop().make_round(self.wait_player_list.pop())
            
            round_list = [round1, round2]
            round1.consumer1.round_list = round_list
            round1.consumer2.round_list = round_list
            round2.consumer1.round_list = round_list
            round2.consumer2.round_list = round_list

        elif 'final' in content:
            if hasattr(self, 'final_player_list') and self in self.final_player_list:

                self.is_final_game = True
                if len(self.final_wait_list) == 1:
                    await self.final_player_list[0].make_game(self.final_player_list[1])
                else:
                    self.final_wait_list.append(self)

        else:
            if 'ArrowUp' in content:
                self.player.set_move_up(content['ArrowUp'])
            if 'ArrowDown' in content:
                self.player.set_move_down(content['ArrowDown'])

    async def send_round_result(self, round_list):
        self.round.status = 'end'
        await self.round.winner.send_json({'gameOver': 'final'})
        await self.round.loser.send_json(self.game.finish_info())

        if round_list[0].status == 'end' and round_list[1].status == 'end':
            final_player_list = [round_list[0].winner, round_list[1].winner]
            round_list[0].winner.opponent = round_list[1].winner
            round_list[1].winner.opponent = round_list[0].winner
            final_wait_list = []
            for round in round_list:
                await round.winner.send_json(
                    {
                        'gameOver': 'final', 
                        'round': [round_list[0].get_result(), round_list[1].get_result()]
                    }
                ) 
                round.winner.final_player_list = final_player_list
                round.winner.final_wait_list = final_wait_list


    async def send_game_over(self):
        if self.is_final_game:
            await self.send_game_data(self.game.finish_info())
            return

        if self.game.winner == self.player:
            self.round.set_result(self, self.opponent)
        else:
            self.round.set_result(self.opponent, self)
        await self.send_round_result(self.round_list)
