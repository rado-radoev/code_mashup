const socket = io()

socket.on('childName', (childName) => {
    console.log("Client received child name: ", childName)
    // var isAddBabyButtonVisible = $('#add-child-btn').is(':visible')
    if (childName) {
        $('#add-child-btn').show()
        $('#name-birthdate-entry-form').hide()
    } else {
        $('#add-child-btn').hide() 
        $('#name-birthdate-entry-form').show()
    }
})


socket.on('date', () => {
   $("#datetimepicker4").find("input").val();
})

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
const dataEntryForm = document.getElementById('height-weigh-entry-form')
dataEntryForm.addEventListener('submit', (e) => {
    e.preventDefault();
})


$( document ).ready(function() {
    console.log( "ready!" );
    only_decimals();

    $('#add-child-btn').click(() => {
        $('#name-birthdate-entry-form').show()
        $('#add-child-btn').hide() 
    })

    $('#datetimepicker4').datetimepicker({
        startDate: 0,
        autoclose: true,
        clearBtn: true,
        format: 'L'
    });
});