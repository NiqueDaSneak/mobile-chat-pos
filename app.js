'use strict'

var fs = require('fs');
var https = require('https');

var express = require('express');
var app = express();
app.use(express.static('public'));

//LOAD HTTPS SERVER
var options = {
    key: fs.readFileSync('security/file.pem'),
    cert: fs.readFileSync('security/file.cert')
};

var serverPort = 3000;

var server = https.createServer(options, app);
var io = require('socket.io')(server);

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

    socket.on('buyer-chat-active', function(){
      socket.emit('welcome-message');
    });

    socket.on('chat message', function(msg){
       console.log('message: ' + msg);
     });
});

// SERVER LISTENING
server.listen(serverPort, function() {
    console.log("Secure server up at port " + serverPort);
});
