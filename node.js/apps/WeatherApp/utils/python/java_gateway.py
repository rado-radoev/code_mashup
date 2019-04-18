from py4j.java_gateway import JavaGateway

class _JavaGateway(JavaGateway):
    __instance = None

    @staticmethod
    def getInstance():
        if _JavaGateway.__instance == None:
            _JavaGateway.__instance = JavaGateway()
        return _JavaGateway.__instance

    def __init__(self):
        if _JavaGateway.__instance != None:
            raise Exception ( self.__instance.__class.__.__name__ + " is singleton")
        else:
            _JavaGateway.__instance = super().__init__()
