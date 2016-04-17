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
    
    $.fn.validatePassComplexity = function () {
        $(this).keyup(function () {
            var pass = $(this).val();
            var complexity = 0;

            if (pass.length >= 6) {
                complexity += 20;
                var nrOfLowercase = 0;
                letters.forEach(function (el, id) {
                    var indices = [];
                    for (var i = 0; i < pass.length; i++) {
                        if (pass[i] === el) {
                            indices.push(i);
                            nrOfLowercase++;
                        }
                    }
                    if (indices.length > 2)
                        complexity -= 1;
                });

                var nrOfUppercase = 0;
                letters.forEach(function (el, id) {
                    var indices = [];
                    for (var i = 0; i < pass.length; i++) {
                        if (pass[i] === el.toUpperCase()) {
                            indices.push(i);
                            nrOfUppercase++;
                        }
                    }
                    if (indices.length > 2)
                        complexity -= 1;
                });

                var nrOfSigns = 0;
                signs.forEach(function (el, id) {
                    var indices = [];
                    for (var i = 0; i < pass.length; i++) {
                        if (pass[i] === el) {
                            indices.push(i);
                            nrOfSigns++;
                        }
                    }
                    if (indices.length > 2)
                        complexity -= 1;
                });

                if (nrOfSigns === 0)
                    complexity -= 10;


                var nrOfNumbers = 0;
                for (var nr = 0; nr <= 9; nr++) {
                    var indices = [];
                    for (var i = 0; i < pass.length; i++) {
                        if (pass[i] == nr) {
                            indices.push(i);
                            nrOfNumbers++;
                        }
                    }
                    if (indices.length > 2)
                        complexity -= 1;
                }


                if (nrOfLowercase > 0)
                    complexity += 10;
                if (nrOfNumbers > 0)
                    complexity += 10;
                if (nrOfUppercase > 0)
                    complexity += 10;
                if (nrOfSigns > 0)
                    complexity += 10;
            }
            if (pass.length > 10)
                complexity += 20;


            var returnValue = complexity * 10.0 / 8;
            console.log(returnValue);

            // <30 bardzo słabe
            // <50 słabe
            // <65 średnie
            // <85 dobre
            // 85 95 bardzo dobre
            // >95 świetne
        });

        return this;
    };

}(jQuery));

