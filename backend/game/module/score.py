class Score:
    def __init__(self):
        self.score = [0, 0]
    
    def get_score(self):
        return self.score
    
    def update_score(self, player):
        if player == 1:
            self.score[0] += 1
        else:
            self.score[1] += 1