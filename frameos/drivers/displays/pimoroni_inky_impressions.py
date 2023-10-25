from drivers.displays import DisplayDriver, DisplayType


class PimoroniInkyImpressions(DisplayDriver):
    name = "Pimoroni Inky Impression"
    display_type = DisplayType.EINK
    width: int = None
    height: int = None
    inches: float = None
