from enum import Enum

from drivers import Driver


class DisplayType(Enum):
    EINK = "eink"
    LCD = "lcd"


class DisplayDriver(Driver):
    name: str = None
    display_type: DisplayType = None
    width: int = None
    height: int = None

