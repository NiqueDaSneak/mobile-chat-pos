'use strict'

// THIS IS FOR LOCAL DEVELOPMENT
// var URL_SERVER = 'http://localhost:3000';
// var socket = io.connect(URL_SERVER);

// THIS IS FOR UPLOAD TO HEROKU
// var URL_SERVER = 'http://www.mobile-chat-pos.herokuapp.com';
var socket = io();

$(document).ready(function() {

    socket.on('connect', function() {

        // DISPLAY WELCOME MESSAGE
        $('#messages').append("<li id='messages'>Welcome to Mobile Chat POS. Choose an option...</li>");

        // DISPLAY MESSAGES FROM SERVER
        socket.on('message', function(data) {
            $('#messages').append("<li id='messages'>" + data.server + "</li>");
        });

        // SENDING UI INFO TO SERVER
        $('.ui-1').click(function() {
            socket.emit('nav', {
                ui: "learn"
            });
        });
        $('.ui-2').click(function() {
            $('input').click();
            socket.emit('nav', {
                ui: "camera"
            });
        });
        $('.ui-3').click(function() {
            socket.emit('nav', {
                ui: "account"
            });
        });

        // HANDLES SENDING THE FILE TO SERVER
        $('#file_upload').change(function(event){
          var file = event.target.files[0];
          var stream = ss.createStream();

          ss(socket).emit('file-upload', stream, {name: file.name, size: file.size});
          ss.createBlobReadStream(file).pipe(stream);
        });
    });


});
