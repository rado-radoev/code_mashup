import string
import random

existing_names = set()

class Robot(object):

    alpha = string.ascii_uppercase

    def __init__(self):

        self.name = self.generate_name()
        existing_names.add(self.name)

    def rand_alpha(self):
        rand_alpha = self.alpha[random.randrange(len(self.alpha))]
        return rand_alpha


    def generate_name(self):
        numeric = random.randrange(0, 1000)
        name = f'{self.rand_alpha()}{self.rand_alpha()}{numeric:03}'

        if name in existing_names:
            while name not in existing_names:
                name = f'{self.rand_alpha()}{self.rand_alpha()}{numeric:03}'

        return name


    def reset(self):
        self.name = self.generate_name()