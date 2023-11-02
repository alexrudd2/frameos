from abc import abstractmethod, ABC
from typing import Optional

from frame import Logger
from enum import Enum
from PIL import Image


class Driver(ABC):
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
    color: Optional[str] = None

    @abstractmethod
    def render_image(self, image: Image):
        pass

    @abstractmethod
    def display_off(self):
        pass

    @abstractmethod
    def display_on(self):
        pass
