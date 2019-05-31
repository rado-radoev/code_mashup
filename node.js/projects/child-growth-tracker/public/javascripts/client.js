function only_decimals() {
    $(".allownumericwithdecimal").on("keypress keyup blur",function (event) {
    //this.value = this.value.replace(/[^0-9\.]/g,'');
        $(this).val($(this).val().replace(/[^0-9\.]/g,''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
}

// Prevent the webapge to be reloated on submit
const dataEntryForm = document.getElementById('data-entry-form')
dataEntryForm.addEventListener('submit', (e) => {
    e.preventDefault();
})

$( document ).ready(function() {
    console.log( "ready!" );
    only_decimals();

    $('#datetimepicker4').datetimepicker({
        startDate: 0,
        autoclose: true,
        clearBtn: true,
        format: 'L'
    });
});