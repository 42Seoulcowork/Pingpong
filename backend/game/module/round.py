class Round():
    def __init__(self, consumer1, consumer2, number):
        self.consumer1 = consumer1
        self.consumer2 = consumer2
        self.number = number
        self.status = 'playing'
        self.winner = None
        self.loser = None

    def get_result(self):
        return {
            'winner': self.winner.player.id,
            'loser': self.loser.player.id
        }

    def set_result(self, winner, loser):
        self.winner = winner
        self.loser = loser