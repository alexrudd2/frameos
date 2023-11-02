from frame import Logger
from enum import Enum


class Driver:
    logger: Logger

    def __init__(self, logger: Logger):
        self.logger = logger


class DisplayType(Enum):
    EINK = "eink"
    LCD = "lcd"


class DisplayDriver(Driver):
    name: str = None
    display_type: DisplayType = None
    width: int = None
    height: int = None

