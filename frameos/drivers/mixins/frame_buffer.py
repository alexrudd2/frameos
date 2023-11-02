from PIL import Image

from frame import Logger
from frame.image_utils import image_to_framebuffer


class FrameBufferMixin(object):
    logger: Logger
    shell: callable

    def render_image(self, image: Image):
        image_to_framebuffer(image, logger=self.logger)

    def display_off(self):
        self.shell('vcgencmd display_power 0')

    def display_on(self):
        self.shell('vcgencmd display_power 1')
