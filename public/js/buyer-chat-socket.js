var URL_SERVER = 'https://localhost:3000';
var socket = io.connect(URL_SERVER);


$(document).ready(function(){
  socket.emit('buyer-chat-active');

  socket.on('welcome-message', function(){
    $('#messages').append("<li id='messages'>Testing</li>");
    console.log('testing');
  });

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
});
