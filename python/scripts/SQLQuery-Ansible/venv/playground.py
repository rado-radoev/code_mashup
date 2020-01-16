

class ClassOne:

    def __init__(self):
        self.a = 'aaa'



class ClassTwo:

    def __init__(self):
        self.b = 'bbb'

    def concatAandB(self, b=""):
        print(hex(id(b)))


two = ClassTwo()
# b = ClassOne()
two.concatAandB()