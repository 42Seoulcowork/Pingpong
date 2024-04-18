import math

class Ball:
    def __init__(self, speed, dir):
        self.pos = [-2 * dir[0], abs(5 * math.cos(math.pi / 24 * (-2 * dir[0] + 5))) + 1, -2 * dir[1]]
        self.speed = speed
        self.dir = dir
        self.init = 0

    def move(self):
        if self.init < 10:
            self.init += 1
            return
        self.pos[0] += self.speed * self.dir[0]
        self.pos[2] += self.speed * self.dir[1]
        if self.dir[0] == 1:
            self.pos[1] = abs(5 * math.cos(math.pi / 24 * (self.pos[0] + 5))) + 1
        else:
            self.pos[1] = abs(5 * math.cos(math.pi / 24 * (self.pos[0] - 5))) + 1

    def update(self, speed, dir):
        self.pos = [-2 * dir[0], abs(5 * math.cos(math.pi / 24 * (-2 * dir[0] + 5))) + 1, -2 * dir[1]]
        self.speed = speed
        self.dir = dir
        self.init = 0


