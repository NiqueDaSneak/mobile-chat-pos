'use strict'

var URL_SERVER = 'http://localhost:3000' || 'http://www.mobile-chat-pos.herokuapp.com';
var socket = io.connect(URL_SERVER);


$(document).ready(function(){

  socket.emit('buyer-chat-active');

  socket.on('welcome-message', function(){
    $('#messages').append("<li id='messages'>Welcome to the chat. Choose an option...</li>");
  });

  socket.on('message', function(data){
    $('#messages').append("<li id='messages'>" + data.server + "</li>");
  });

  $('.ui-1').click(function(){
    socket.emit('nav', { ui: "learn" });
  });

  $('.ui-2').click(function(){
    $('input').click();
    socket.emit('nav', { ui: "camera" });
  });

  $('.ui-3').click(function(){
    socket.emit('nav', { ui: "account" });
  });

});
