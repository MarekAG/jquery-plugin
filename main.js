(function ($) {

    $.fn.validateText = function (options) {
        var settings = $.extend({
            pattern: ""
        }, options);
        console.log(settings.pattern);
        $(this).on('change', function () {
            if (null === ($(this).val().match(settings.pattern))) {
                $.error("nie działa");
            } else {
                console.log("działa");
            }
        });

        return this;
    };

    $.fn.validateEmail = function () {
        this.validateText({pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i});
        return this;
    };

}(jQuery));

