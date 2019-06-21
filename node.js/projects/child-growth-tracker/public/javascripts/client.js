const socket = io()

var defaultChild;

socket.on('newChildSelected', (selectedChild) => {
    let childId = selectedChild._id
    socket.emit('request_weight', childId);
    socket.emit('request_height', childId);
});

socket.on('childName', (childName) => {
    // console.log("Client received child name: ", childName)
    // var isAddBabyButtonVisible = $('#add-child-btn').is(':visible')
    if (childName) {
        $('#add-child-btn').show()
        $('#name-birthdate-entry-form').hide()
    } else {
        $('#add-child-btn').hide() 
        $('#name-birthdate-entry-form').show()
    }
})

socket.on('child-added-to-db-notify', (childName) => {
    $.notify(`${childName} saved`, "info");
})

socket.on('child-data-added-to-db-notify', (childName) => {
    // console.log(childName)
    $.notify(`${childName} height and weight saved`, "info");
})

socket.on('date', () => {
   $("#datetimepicker4").find("input").val();
})

// Prevent the webapge to be reloated on submit
const dataEntryForm = document.getElementById('height-weigh-entry-form')
dataEntryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var height = $('#heightInput').val();
    var weight = $('#weightInput').val();

    socket.emit('height-weight', {height, weight});
    socket.emit('request_height')
    socket.emit('request_weight')

    $('#heightInput').val("");
    $('#weightInput').val("");
});

// Prevent the webapge to be reloated on submit
const dataEntryForm2 = document.getElementById('name-birthdate-entry-form')
dataEntryForm2.addEventListener('submit', (e) => {
    // console.log('clicked submit in name-birthdate-entry-form')
    var name = $('#babyInputName').val()
    var date = $("#datetimepicker4").find("input").val();
    socket.emit('new-child', { 
        name,
        birthdate: date
    })

    $('#add-child-btn').show();
    $('#name-birthdate-entry-form').hide();
    
    e.preventDefault();
});
dataEntryForm2.addEventListener('reset', (e) => {
    e.preventDefault();
    $('#add-child-btn').show()
    $('#name-birthdate-entry-form').hide()
});

function joinRoom(roomName) {
    socket.emit('join', roomName, (error) => {
        if (error) {
            alert(error)
            location.href = '/'
        }
    });
}

function focusOnInput() {
    var nameEntryVisible = $('#name-birthdate-entry-form').is(':visible')

    if (nameEntryVisible) {
        $('#babyInputName').focus()
    } else {
        $('#heightInput').focus()
    }
}

function only_decimals() {
    $(".allownumericwithdecimal").on("keypress keyup blur",function (event) {
    //this.value = this.value.replace(/[^0-9\.]/g,'');
        $(this).val($(this).val().replace(/[^0-9\.]/g,''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
}

$('#add-child-btn').click(() => {
    $('#name-birthdate-entry-form').show()
    $('#add-child-btn').hide() 
});

$(".dropdown-menu a").click(function() {
    var a = $(this).text()
    $(".btn:first-child").html(a);
    // location.href = `http://localhost:3000/name/${a}`  

    function f() {
        socket.emit('newDefaultChildName', a); 
    }
    setTimeout(f, 1500)
       
  });

$( document ).ready(function() {

    // socket.emit('request_height')
    // socket.emit('request_weight')

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $('#datetimepicker4').datetimepicker({
        startDate: 0,
        autoclose: true,
        clearBtn: true,
        format: 'L'
    });

    only_decimals();

    focusOnInput();
});