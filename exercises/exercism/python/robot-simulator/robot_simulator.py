# Globals for the bearings
# Change the values as you see fit
NORTH = 0
WEST = 1
SOUTH = 2
EAST = 3



class Robot(object):

    simulations = {'A', 'L', 'R'}

    def __init__(self, bearing=NORTH, x=0, y=0):
        self.bearing = bearing
        self.coordinates = (x, y)
        self.dict = {
            'L': self.turn_left,
            'R': self.turn_right,
            'A': self.advance,
        }

    def turn_left(self):
        self.bearing = (self.bearing + 1) % 4
        print(f'facing {self.bearing}')


    def turn_right(self):
        self.bearing = (self.bearing - 1) % 4
        print(f'facing {self.bearing}')

    def advance(self):
        direction = self.bearing

        if direction == NORTH:
            self.coordinates = (self.coordinates[0], self.coordinates[1] + 1)
        elif direction == SOUTH:
            self.coordinates = (self.coordinates[0], self.coordinates[1] - 1)
        elif direction == EAST:
            self.coordinates = (self.coordinates[0] + 1, self.coordinates[1])
        else:
            self.coordinates = (self.coordinates[0] - 1, self.coordinates[1])

        print(self.coordinates)


    def simulate(self, *args):
        for a in args[0]:
            print(f'direction: {a}\n')
            if a in self.simulations:
                print('{self.dict[a]}')
                self.dict[a]()


    def reset_position(self):
        """This will turn the robot back to facing NORTH (0)"""
        self.bearing = NORTH

