class Ball:
    def __init__(self, pos, speed, dir):
        self.pos = pos
        self.speed = speed
        self.dir = dir

    def move(self):
        self.pos[0] += self.speed * self.dir[0]
        self.pos[2] += self.speed * self.dir[1]
        self.pos[1] = 10 - self.pos[0] ** 2 / 9
        if self.pos[1] < 1:
            self.pos[1] = 1 + (1 - self.pos[1]) / 3

    def info(self):
        return self.pos

    # def bounce(self, axis):
    #     self.direction[axis] *= -1

    # def draw(self, screen):
    #     pygame.draw.circle(screen, self.color, (self.x, self.y), self.radius)

    # def check_collision(self, player):
    #     if self.x - self.radius <= player.x + player.width and self.x + self.radius >= player.x:
    #         if self.y + self.radius >= player.y and self.y - self.radius <= player.y + player.height:
    #             return True
    #     return False

    # def check_boundaries(self, height):
    #     if self.y - self.radius <= 0 or self.y + self.radius >= height:
    #         self.bounce(1)