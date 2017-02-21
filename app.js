var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// app.use(function(req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "http://localhost:1234");
//   // res.header('Access-Control-Allow-Credentials', true);
//   // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

var nsp = io.of('/india');
nsp.on('connection', function (socket) {
  nsp.emit('hi', {description: 'Hello everyone!'});
  socket.on('hey', function (data) {
    console.log(data);
  });
});


server.listen(3000, function(){
  console.log('listening on *:3000');
});
