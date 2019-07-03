const socket = io()

socket.on('newChildSelected', (selectedChild) => {

    sessionStorage.setItem('defaultChild', JSON.stringify(selectedChild))

    let childId = selectedChild._id
    socket.emit('request_weight', childId);
    socket.emit('request_height', childId);
});

socket.on('addChildHide', () => {
    // console.log("Client received child name: ", childName)
    // var isAddBabyButtonVisible = $('#add-child-btn').is(':visible')
    if (!sessionStorage.getItem('defaultChild')) {
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

// socket.on('date', () => {
//    $("#datetimepicker4").find("input").val();
// })

$('.form-signup').submit((event) => {
    event.preventDefault();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var username = $('#username').val();
    var email = $('#registerEmail').val();
    var pass1 = $('#registerPassword').val();
    console.log(pass1)
    var pass2 = $('#repeatLoginPassword').val();
    console.log(pass2)
    if (pass1 != pass2) {
        alert('Passwords do not match')
        return;
    }

    var data = JSON.stringify( {
        firstName,
        lastName, 
        username, 
        email,
        password: pass1
    })

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === 4 && this.status == 200) {
            console.log(this.responseText);
            location.href = `http://localhost:3000/` 
        }
    });

    xhr.open('POST', '/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('cache-control', 'no-cache');

    xhr.send(data);
    
    xhr.open('POST', '/users/login');
    xhr.send(data);

    
    // xhr.open('POST', '/users/login');
    // xhr.send(data);
})


$('.form-signin').submit((event) => {
    event.preventDefault();
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();

    var data = JSON.stringify({
        email,
        password
    })

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === 4 && this.status == 200) {
            console.log(this.responseText);
            location.href = `http://localhost:3000/` 
        }
    });

    xhr.open('POST', '/users/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('cache-control', 'no-cache');

    xhr.send(data);
})

// Prevent the webapge to be reloated on submit
const dataEntryForm = document.getElementById('height-weigh-entry-form')
dataEntryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var height = $('#heightInput').val();
    var weight = $('#weightInput').val();

    let childId = JSON.parse(sessionStorage.getItem('defaultChild'));
    socket.emit('height-weight', {height, weight}, childId._id, childId.name);
    socket.emit('request_height', childId._id)
    socket.emit('request_weight', childId._id)

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

function hideOrDisplayAddChildBtn() {
    if (sessionStorage.getItem('defaultChild')) {
        $('#add-child-btn').show()
        $('#name-birthdate-entry-form').hide()
    } else {
        $('#add-child-btn').hide() 
        $('#name-birthdate-entry-form').show()
    }
}




$('#add-child-btn').click(() => {
    $('#name-birthdate-entry-form').show()
    $('#add-child-btn').hide() 
});

$(".dropdown-menu a").click(function() {
    var a = $(this).text()
    $(".btn:first-child").html(a);
    location.href = `http://localhost:3000/name/${a}`  

    socket.emit('newDefaultChildName', a); 
       
  });

$( document ).ready(function() {
    let childId = JSON.parse(sessionStorage.getItem('defaultChild'));
    socket.emit('request_weight', childId._id);
    socket.emit('request_height', childId._id);

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $('#datetimepicker4').datetimepicker({
        startDate: 0,
        autoclose: true,
        clearBtn: true,
        format: 'L'
    });

    hideOrDisplayAddChildBtn()

    only_decimals();

    focusOnInput();
});