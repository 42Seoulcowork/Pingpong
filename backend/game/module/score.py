class Score:
    def __init__(self):
        self.score = [0, 0]
    
    def get_score(self):
        return self.score
    
    def add_p1(self):
        self.score[0] += 1
    
    def add_p2(self):
        self.score[1] += 1

    def info(self):
        return self.score