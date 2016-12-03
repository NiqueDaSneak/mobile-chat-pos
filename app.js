'use strict'

var fs = require('fs');
var https = require('https');

var express = require('express');
var app = express();
app.use(express.static('public'))

var options = {
  key: fs.readFileSync('security/file.pem'),
  cert: fs.readFileSync('security/file.cert')
};

var serverPort = 3000;

var server = https.createServer(options, app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html')
});

io.on('connection', function(socket){
  console.log('New socket connection from secure server!');
  socket.emit('message', 'This message is comming from a secure server!')
});

server.listen(serverPort, function(){
  console.log("Secure server up at port " + serverPort);
});
