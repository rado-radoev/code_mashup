const socket = io()

socket.on('cipher', function(msg){
    console.log('received message')
    $('body').append('<li>'+msg+'</li>');
});