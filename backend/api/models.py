from django.db import models

class User(models.Model):
    intra_id = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    game_status = models.BooleanField(default=False)
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)

    def __str__(self):
        return self.intra_id
