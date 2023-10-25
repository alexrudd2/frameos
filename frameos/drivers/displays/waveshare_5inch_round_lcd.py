from drivers.displays import DisplayDriver, DisplayType
from drivers.displays.mixins.frame_buffer import FrameBufferMixin


class Waveshare5inchRoundLcd(DisplayDriver, FrameBufferMixin):
    name = 'Waveshare 5" Round LCD'
    display_type = DisplayType.LCD
    width: 1080
    height: 1080
    inches: 5.0
