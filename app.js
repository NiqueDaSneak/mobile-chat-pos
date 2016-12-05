'use strict'

// SERVER SETUP
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// SERVER LISTENING
var serverPort = process.env.PORT || 3000;
server.listen(serverPort, function() {
    console.log("Server up at port " + serverPort);
});


// CLIENT TO SERVER FILE TRANSFER
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs-extra');

// RENDER STATIC FILES
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

    // CREATE CONNECTION TO CLIENT
    console.log('new user w/ secure connection... ');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    // SENDING WELCOME MESSAGE TO CLIENT
    socket.on('buyer-chat-active', function() {
        socket.emit('welcome-message');
    });

    // CLIENT UI INPUT HANDLER
    socket.on('nav', function(data) {
        switch (data.ui) {
            case "learn":
                socket.emit('message', {
                    server: 'This app helps you buy right now! Tap the button below to take a photo of the name card by the product. We will take care of the rest.'
                });
                break;
            case "camera":
                // FILE UPLOAD FROM CLIENT
                ss(socket).on('file-upload', function(stream, data) {
                    var filename = 'temp/' + data.name
                    stream.pipe(fs.createWriteStream(filename));
                });
                break;
            case "account":
                socket.emit('message', {
                    server: 'We can handle that later, go ahead and take a picture!'
                });
                break;
            default:

        }

    });


});
