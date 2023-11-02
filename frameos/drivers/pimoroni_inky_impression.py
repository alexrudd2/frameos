from PIL import Image
from drivers import DisplayDriver, DisplayType
from drivers.mixins.eink import EInkMixin


class PimoroniInkyImpression(DisplayDriver, EInkMixin):
    name = "Pimoroni Inky Impression"
    display_type = DisplayType.EINK
    width: int = None
    height: int = None
    inches: float = None

    def __init__(self, logger):
        super().__init__(logger)
        from inky.auto import auto
        self.inky = auto()
        self.width = self.inky.resolution[0]
        self.height = self.inky.resolution[1]
        self.color = self.inky.colour
        if self.height == 480:
            self.inches = 7.3
        elif self.height == 448:
            self.inches = 5.7
        elif self.height == 400:
            self.inches = 4.0


    def render_image(self, image: Image):
        self.inky.set_image(image, saturation=1)
        self.inky.show()
