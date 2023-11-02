class EInkMixin(object):
    shell: callable

    # Not relevant for e-ink displays
    def display_off(self):
        pass

    # Not relevant for e-ink displays
    def display_on(self):
        pass
