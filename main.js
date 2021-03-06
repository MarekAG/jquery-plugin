(function ($) {

    var letters = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ż', 'ź'];
    var signs = ['!', '#', '%', '&', '(', ')', '*', '+', ',', '-', '.', '/', '~', '<', '=', '>', '?', '@', '[', '\\', ']', "'", '^', '_', '`', '{', '|', '}'];

    $.fn.validateText = function (options) {
        var settings = $.extend({
            pattern: ""
        }, options);
        $(this).on('change', function () {
            if (null === ($(this).val().match(settings.pattern))) {
                $("#passValidation").text("Hasło nie pasuje do wzorca: " + settings.pattern);
                $(this).css("border-color", "red");

            } else {
                $("#passValidation").text("Hasło pasuje do wzorca");
                $(this).css("border-color", "black  ");
            }
        });

        return this;
    };

    $.fn.validateEmail = function () {
        $(this).keyup( function () {
            if (null === ($(this).val().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i))) {
                $(this).css("border-color", "red");
            } else {
                $(this).css("border-color", "black  ");
            }
        });
        return this;
    };

    $.fn.validateForm = function () {
        var isEmpty = false;
        $(this).submit(function (e) {
            $(this).find(":first-child").find(":input").each(function () {
                if ($(this).val().length < 1) {
                    console.log($(this).val());
                    isEmpty = true;
                }
            });
            if (isEmpty)
                return false;
            else
                return true;
        });

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

            var passValidity;
            if (returnValue === 0)
                passValidity = "";
            else if (returnValue < 30)
                passValidity = "Bardzo słabe";
            else if (returnValue < 50)
                passValidity = "Słabe";
            else if (returnValue < 65)
                passValidity = "Średnie";
            else if (returnValue < 85)
                passValidity = "Dobre";
            else if (returnValue < 95)
                passValidity = "Bardzo dobre";
            else
                passValidity = "Świetne";

            $("#passValidation").text(passValidity);
            if (passValidity < 50) {
                $(this).css("border-color", "red");
            } else {
                $(this).css("border-color", "black  ");
            }

        });

        return this;
    };

    $.fn.validatePassEntropy = function () {
        $(this).keyup(function () {
            var pass = $(this).val();

            // foreach prob * log2(1/prob)
            var nrOfLetters = letters.length + 2;
            var nrOfSigns = signs.length;
            var nrOfNumbers = 10;

            var lettersInPass = 0;
            var signsInPass = 0;
            var numbersInPass = 0;
            for (var i = 0; i < pass.length; i++) {
                if (letters.indexOf(pass[i].toLowerCase()) != -1) {
                    lettersInPass++;
                }

                else if (signs.indexOf(pass[i]) != -1) {
                    signsInPass++;
                } else if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(parseInt(pass[i])) != -1) {
                    numbersInPass++;
                }
            }

            var lettersSum = lettersInPass * (1 / nrOfLetters * log2(nrOfLetters));
            var signsSum = signsInPass * (1 / nrOfSigns * log2(nrOfSigns));
            var numbersSum = numbersInPass * (1 / nrOfNumbers * log2(nrOfNumbers));

            var wholeSum = lettersSum + signsSum + numbersSum;
            console.log(wholeSum);

            if (wholeSum < 2) {
                $("#passValidation").text("Hasło za słabe");
                $(this).css("border-color", "red");
            } else {
                $("#passValidation").text("Dobre hasło");
                $(this).css("border-color", "black  ");
            }

        });

        return this;

    };

    function log2(val) {
        return Math.log(val) / Math.LN2;
    }

    $.fn.validateZipCode = function (options) {

        var settings = $.extend({
            cityFieldName: "city"
        }, options);
        var pattern = /^[0-9]{2}-[0-9]{3}$/;

        $(this).keyup(function () {
            if (null === ($(this).val().match(pattern))) {
                $("input[name='" + settings.cityFieldName + "']").val(" ");
                $(this).css("border-color", "black");
            } else {
                var found = getCityFromCsv($(this).val(), settings.cityFieldName);
                if (found) {
                    $(this).css("border-color", "black");
                }
                if(!found) {
                    $(this).css("border-color", "red");
                }
            }
        });
        return this;
    };

    function getCityFromCsv(zipCode, options) {
        var isFound = false;
        var settings = $.extend({
            cityFieldName: "city"
        }, options);

        var path = "./kody.csv";
        $.get(path, function (data) {

            var x = Papa.parse(data, {
                delimiter: ";",
                header: true
            });

            for (var key in x.data) {
                if (x.data[key]['KOD POCZTOWY'] == zipCode) {
                    isFound = true;
                    $("input[name='" + settings.cityFieldName + "']").val(x.data[key]['MIEJSCOWOŚĆ']);
                }

            }

        });
        return isFound;
    }

}(jQuery));
