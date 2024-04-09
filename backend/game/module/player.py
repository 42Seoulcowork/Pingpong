class Player:
    def __init__(self, id, player):
        self.id = id
        if player == 1:
            x = -13
        else:
            x = 13
        self.position = [x, 1, 0]
    
    def __str__(self):
        return self.id
    
    def move_up(self):
        self.position[1] += 1

    def move_down(self):
        self.position[1] -= 1

    def get_position(self):
        return self.position
