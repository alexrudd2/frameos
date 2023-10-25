from frame import Logger


class Driver:
    logger: Logger

    def __init__(self, logger: Logger):
        self.logger = logger
