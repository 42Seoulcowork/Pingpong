import math
from .enum import X, Y, Z

class Ball:
    def __init__(self, speed, dir):
        self.pos = [-2 * dir[X], abs(5 * math.cos(math.pi / 24 * (-2 * dir[X] + 5))) + 1, -2 * dir[Z]]
        self.speed = speed
        self.dir = dir
        self.init = 0

    def move(self):
        if self.init < 10:
            self.init += 1
            return
        self.pos[X] += self.speed * self.dir[X]
        self.pos[Z] += self.speed * self.dir[Z]
        if self.dir[X] == 1:
            self.pos[Y] = abs(5 * math.cos(math.pi / 24 * (self.pos[X] + 5))) + 1
        else:
            self.pos[Y] = abs(5 * math.cos(math.pi / 24 * (self.pos[X] - 5))) + 1

    def update(self, speed, dir):
        self.pos = [-2 * dir[X], abs(5 * math.cos(math.pi / 24 * (-2 * dir[X] + 5))) + 1, -2 * dir[Z]]
        self.speed = speed
        self.dir = dir
        self.init = 0


