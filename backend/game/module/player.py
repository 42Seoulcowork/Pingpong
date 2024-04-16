class Player:
    def __init__(self, id, player):
        self.id = id
        if player == 1:
            x = -13
        else:
            x = 13
        self.pos = [x, 1, 0]
    
    def __str__(self):
        return self.id
    
    def move_up(self):
        if self.pos[2] >= 13:
            return
        self.pos[2] += 1

    def move_down(self):
        if self.pos[2] <= -13:
            return
        self.pos[2] -= 1

    def info(self):
        return self.pos
