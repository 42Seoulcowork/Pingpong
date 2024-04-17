class Player:
    def __init__(self, id, player):
        self.id = id
        self.move_up_state = False
        self.move_down_state = False
        self.speed = 1
        if player == 1:
            x = -13
        else:
            x = 13
        self.pos = [x, 2, 0]
    
    def __str__(self):
        return self.id
    
    def move_up(self):
        if self.pos[2] <= -13:
            return
        self.pos[2] -= self.speed

    def move_down(self):
        if self.pos[2] >= 13:
            return
        self.pos[2] += self.speed

    def set_move_up(self, state):
        self.move_up_state = state
    
    def set_move_down(self, state):
        self.move_down_state = state

    def update(self):
        if self.move_up_state:
            self.move_up()
        if self.move_down_state:
            self.move_down()

    def info(self):
        return self.pos