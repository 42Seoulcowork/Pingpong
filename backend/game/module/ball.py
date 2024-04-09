class Ball:
    def __init__(self, x, y, radius, color, speed, direction):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color
        self.speed = speed
        self.direction = direction

    def move(self):
        self.x += self.speed * self.direction[0]
        self.y += self.speed * self.direction[1]

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