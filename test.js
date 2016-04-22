$(document).ready(function() {
    // $('#password').validateText( {pattern: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłóńśźż]*$/} );
     $('#password').validatePassComplexity();
    //$('#password').validatePassEntropy();
    $("#zip").validateZipCode();
    $('#email').validateEmail();
    $("#myForm").validateForm();
});
