# Globals for the bearings
# Change the values as you see fit
EAST = -1
NORTH = 0
WEST = -3
SOUTH = -2


class Robot(object):
    def __init__(self, bearing=NORTH, x=0, y=0):
        self.bearing = bearing
        self.coordinates = (x, y)

    def turn_left(self):
        if self.bearing == -3: # if robot is facing west
            self.reset_position()# left means turn north

        self.bearing -= 1


    def turn_right(self):
        if self.bearing == -1: # if robot is facing east
            self.reset_position() # turn right means face north

        self.bearing += 1

    def advance(self):
        pass

    def simulate(self, *args):
        pass

    def reset_position(self):
        """This will turn the robot back to facing NORTH (0)"""
        self.bearing = NORTH


if __name__ == '__main__':
    dirA = [EAST, SOUTH, WEST, NORTH]
    dirB = [SOUTH, WEST, NORTH, EAST]
    for x in range(len(dirA)):
        robot = Robot(dirA[x], 0, 0)
        robot.turn_right()
        print(f"robot facing: {robot.bearing} should be facing: {dirB[x]}")