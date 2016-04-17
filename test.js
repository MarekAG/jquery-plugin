$(document).ready(function() {
    $('#password').validateText(pattern: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłóńśźż]*$/);
    $('#password').validatePassComplexity();
});
