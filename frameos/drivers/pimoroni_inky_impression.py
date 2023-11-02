from drivers import DisplayDriver, DisplayType


class PimoroniInkyImpression(DisplayDriver):
    name = "Pimoroni Inky Impression"
    display_type = DisplayType.EINK
    width: int = None
    height: int = None
    inches: float = None
