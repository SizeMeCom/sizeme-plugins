(function ($) {

    const pluginName = "sizemeSelectric";
    const sizemeChange = "sizemeChange";
    const currIndex = "currIndex";

    class SizemeSelectric {
        constructor (element, $element) {
            this.element = element;
            this.$element = $element;
            this.currIndex = "";

            this.element.addEventListener(sizemeChange, this.sizemeListener);
            this.$element
                .on("selectric-change", this.selectricListener)
                .data(pluginName, this);
        }

        selectricListener = () => {
            this.$element.data(currIndex, this.element.value);
            this.element.dispatchEvent(new Event("change"));
        };

        sizemeListener = () => {
            if (this.currIndex !== this.element.value) {
                this.$element.selectric("refresh");
            }
        };

        destroy = () => {
            this.$element
                .off("selectric-change", this.selectricListener)
                .removeData(pluginName);
            this.element.removeEventListener(sizemeChange, this.sizemeListener);
        };
    }

    $.fn[pluginName] = function (op = "init") {
        this.each(function() {
            const element = this;
            const $element = $(this);
            const selectric = $element.data("selectric");
            const sizemeSelectric = $element.data(pluginName);

            switch (op) {
                
                case "init":
                    if (selectric && !sizemeSelectric) {
                        new SizemeSelectric(element, $element);
                    }
                    break;

                case "destroy":
                    if (sizemeSelectric) {
                        sizemeSelectric.destroy();
                    }
                    break;

                default:
            }
        });

        return this;
    }
})(jQuery);