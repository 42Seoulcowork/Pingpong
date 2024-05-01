from .enum import X, Z
class Player:
    def __init__(self, id):
        self.id = id
        self.move_up_state = False
        self.move_down_state = False
        self.speed = 1

    def set_pos(self, player):
        if player == 1:
            self.pos = [-13, 4, 0]
        else:
            self.pos = [13, 4, 0]
        self.score = 0

    def __str__(self):
        return self.id
    
    def move_up(self):
        if self.pos[Z] <= -13:
            return
        self.pos[Z] -= self.speed

    def move_down(self):
        if self.pos[Z] >= 13:
            return
        self.pos[Z] += self.speed

    def set_move_up(self, state):
        self.move_up_state = state
    
    def set_move_down(self, state):
        self.move_down_state = state

    def add_score(self):
        self.score += 1

    def update(self):
        if self.move_up_state:
            self.move_up()
        if self.move_down_state:
            self.move_down()