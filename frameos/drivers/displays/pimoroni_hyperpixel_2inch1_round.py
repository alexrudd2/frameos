from drivers.displays import DisplayDriver, DisplayType
import RPi.GPIO as GPIO

from drivers.displays.mixins.frame_buffer import FrameBufferMixin


class PimoroniHyperPixel2Inch1Round(DisplayDriver, FrameBufferMixin):
    name = 'Pimoroni HyperPixel 2.1" Round'
    display_type = DisplayType.LCD
    width = 480
    height = 480
    inches = 2.1

    def display_off(self):
        GPIO.setmode(GPIO.BCM)
        pin = 19
        GPIO.setup(pin, GPIO.OUT)
        pwm = GPIO.PWM(pin, 1000)
        pwm.start(0)
        pwm.stop()

    def display_on(self):
        GPIO.cleanup()
