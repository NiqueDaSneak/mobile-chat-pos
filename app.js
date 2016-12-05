'use strict'

var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// SERVER LISTENING
var serverPort = process.env.PORT || 3000;
server.listen(serverPort, function() {
  console.log("Server up at port " + serverPort);
});

app.use(express.static('public'));


// ROUTES
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/buyer-chat', function(req, res) {
    res.sendFile(__dirname + '/public/views/buyer-chat.html')
});

app.get('/seller-home', function(req, res) {
    res.send('seller home');
});

// SOCKET
io.on('connection', function(socket) {

    console.log('new user w/ secure connection... ');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('buyer-chat-active', function() {
        socket.emit('welcome-message');
    });

    socket.on('nav', function(data) {
        switch (data.ui) {
            case "learn":
                socket.emit('message', { server: 'This app helps you buy right now! Tap the button below to take a photo of the name card by the product. We will take care of the rest.' });
                break;
            case "camera":
                console.log("inside camera block");
                break;
            case "account":
                socket.emit('message', {server: 'We can handle that later, go ahead and take a picture!'});
                break;
            default:

        }
    });

});
