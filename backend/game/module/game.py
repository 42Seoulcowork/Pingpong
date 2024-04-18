from .player import Player
from .ball import Ball
from .enum import GAME_OVER

class Game:
    def __init__(self, p1, p2, speed=0.5):
        self.p1 = p1
        self.p2 = p2
        self.ball = Ball(speed, [1, -1])
        self.winner = None

    def update(self):
        self.p1.update()
        self.p2.update()
        self.ball.move()
        if -13 < self.ball.pos[0] < 13:
            self.hit_paddle()
            self.hit_wall()
        self.update_score()
        if self.p1.score == 5:
            self.winner = self.p1
            return GAME_OVER
        if self.p2.score == 5:
            self.winner = self.p2
            return GAME_OVER
        return 0

    def update_score(self):
        if self.ball.pos[0] <= -24:
            self.p2.add_score()
            self.ball.update(0.5, [1, -1])
        if self.ball.pos[0] >= 24:
            self.p1.add_score()
            self.ball.update(0.5, [-1, 1])

    def hit_wall(self):
        if self.ball.pos[2] <= -14 or self.ball.pos[2] >= 14:
            self.ball.dir[1] *= -1

    def hit_paddle(self):
        if self.ball.pos[0] <= -11.5:
            if self.p1.pos[2] - 3 <= self.ball.pos[2] <= self.p1.pos[2] + 3:
                self.ball.dir[0] = 1
        if  self.ball.pos[0] >= 11.5:
            if self.p2.pos[2] - 3 <= self.ball.pos[2] <= self.p2.pos[2] + 3:
                self.ball.dir[0] = -1

    def info(self):
        return {
            'p1': self.p1.pos,
            'p2': self.p2.pos,
            'ball': self.ball.pos,
            'score': [self.p1.score, self.p2.score]
        }

    def finish_info(self):
        return {
            'p1': self.p1.pos,
            'p2': self.p2.pos,
            'ball': self.ball.pos,
            'score': [self.p1.score, self.p2.score],
            'gameOver': 'normal',
            'winner': self.winner.id
        }