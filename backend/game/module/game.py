from .score import Score
from .player import Player
from .ball import Ball

class Game:
    def __init__(self):
        self.score = Score()
        self.p1 = Player('p1', 1)
        self.p2 = Player('p2', 2)
        self.ball = Ball([0, 1, 0], 0.5, [1, -1])

    def set_state(self, info):
        if 'w' in info:
            self.p1.set_move_up(info['w'])
        if 's' in info:
            self.p1.set_move_down(info['s'])
        if 'ArrowUp' in info:
            self.p2.set_move_up(info['ArrowUp'])
        if 'ArrowDown' in info:
            self.p2.set_move_down(info['ArrowDown'])

    def update(self):
        self.p1.update()
        self.p2.update()
        self.ball.move()
        if -13 < self.ball.pos[0] < 13:
            self.hit_paddle()
            self.hit_wall()
        self.check_score()

    def check_score(self):
        if self.ball.pos[0] <= -20:
            self.score.add_p2()
            self.ball = Ball([0, 1, 0], 0.5, [1, -1])
        if self.ball.pos[0] >= 20:
            self.score.add_p1()
            self.ball = Ball([0, 1, 0], 0.5, [-1, 1])

    def hit_wall(self):
        if self.ball.pos[2] <= -14 or self.ball.pos[2] >= 14:
            self.ball.dir[1] *= -1

    def hit_paddle(self):
        if self.ball.pos[0] <= -11.5:
            if self.p1.pos[2] - 2.75 <= self.ball.pos[2] <= self.p1.pos[2] + 2.75:
                self.ball.dir[0] = 1
        if  self.ball.pos[0] >= 11.5:
            if self.p2.pos[2] - 2.5 <= self.ball.pos[2] <= self.p2.pos[2] + 2.5:
                self.ball.dir[0] = -1

    def info(self):
        return {
            'score' : self.score.info(),
            'p1' : self.p1.info(),
            'p2' : self.p2.info(),
            'ball' : self.ball.info(),
        }