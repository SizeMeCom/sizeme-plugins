(function ($) {
    $.fn.sizemeSelectric = function () {
        this.each(function() {
            var element = this;
            var $element = $(this);
            if ($element.data("selectric")) {

                $element.on("selectric-change", function () {
                    $element.data("currIndex", element.value);
                    element.dispatchEvent(new Event("change"));
                });

                this.addEventListener("sizemeChange", function () {
                    if ($element.data("currIndex") !== element.value) {
                        $element.selectric("refresh");
                    }
                });
            }
        });

        return this;
    }
})(jQuery);