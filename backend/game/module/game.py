from .score import Score
from .player import Player
from .ball import Ball

class Game:
    def __init__(self):
        self.score = Score()
        self.p1 = Player('p1', 1)
        self.p2 = Player('p2', 2)
        self.ball = Ball([0, 1, 0], 1, 1)

    def info(self):
        return {
            'score' : self.score.info(),
            'p1' : self.p1.info(),
            'p2' : self.p2.info(),
            'ball' : self.ball.info(),
        }