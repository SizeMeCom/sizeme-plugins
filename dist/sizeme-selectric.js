"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {

    var pluginName = "sizemeSelectric";
    var sizemeChange = "sizemeChange";
    var currIndex = "currIndex";

    var SizemeSelectric = function SizemeSelectric(element, $element) {
        var _this = this;

        _classCallCheck(this, SizemeSelectric);

        this.selectricListener = function () {
            _this.$element.data(currIndex, _this.element.value);
            _this.element.dispatchEvent(new Event("change"));
        };

        this.sizemeListener = function () {
            if (_this.currIndex !== _this.element.value) {
                _this.$element.selectric("refresh");
            }
        };

        this.destroy = function () {
            _this.$element.off("selectric-change", _this.selectricListener).removeData(pluginName);
            _this.element.removeEventListener(sizemeChange, _this.sizemeListener);
        };

        this.element = element;
        this.$element = $element;
        this.currIndex = "";

        this.element.addEventListener(sizemeChange, this.sizemeListener);
        this.$element.on("selectric-change", this.selectricListener).data(pluginName, this);
    };

    $.fn[pluginName] = function () {
        var op = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "init";

        this.each(function () {
            var element = this;
            var $element = $(this);
            var selectric = $element.data("selectric");
            var sizemeSelectric = $element.data(pluginName);

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
    };
})(jQuery);