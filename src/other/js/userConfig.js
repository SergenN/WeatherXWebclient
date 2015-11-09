/**
 * Created by Sergen on 8-11-2015.
 */
var oldPass = false;
var newPass = false;
var newPassr = false;

$( document ).ready(function() {
    $("[id='themeCheck']").bootstrapSwitch();

    $('#oldPass').bind('input', function() {
        oldPass = lengthCheck('oldPass');
        checkEnabled();
    });

    $('#newPass').bind('input', function() {
        newPass = lengthCheck('newPass');

        if ($('#newPass').val() === $('#newPassr').val()){
            newPassr = lengthCheck('newPassr');
        } else {
            setUnchecked('newPassr');
            newPassr = false;
        }
        checkEnabled();
    });

    $('#newPassr').bind('input', function() {
        if ($('#newPass').val() === $('#newPassr').val()){
            newPassr = lengthCheck('newPassr');
        } else {
            setUnchecked('newPassr');
            newPassr = false;
        }
        checkEnabled();
    });

    $('input[name="themeCheck"]').on('switchChange.bootstrapSwitch', function() {
        $('#themeSubmit').trigger('click');
    });

});

function lengthCheck(div){
    if($('#'+div).val().length > 0){
        setChecked(div);
        return true;
    } else {
        setUnchecked(div);
        return false;
    }
}

function setChecked(div){
    if (document.getElementById(div+"Div").className.indexOf('has-error') != -1) {
        document.getElementById(div+"Div").className = document.getElementById(div+"Div").className.replace('has-error', 'has-success');
        document.getElementById(div+"Ico").className = document.getElementById(div+"Ico").className.replace('glyphicon-remove', 'glyphicon-ok');
    }
}

function setUnchecked(div){
    if (document.getElementById(div+"Div").className.indexOf('has-success') != -1) {
        document.getElementById(div+"Div").className = document.getElementById(div+"Div").className.replace('has-success', 'has-error');
        document.getElementById(div+"Ico").className = document.getElementById(div+"Ico").className.replace('glyphicon-ok', 'glyphicon-remove');
    }
}

function checkEnabled(){
    if (newPass && newPassr && oldPass) {
        $("#submitPass").prop('disabled', false);
    } else {
        $("#submitPass").prop('disabled', true);
    }
}
