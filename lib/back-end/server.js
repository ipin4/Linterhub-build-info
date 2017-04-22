var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');
const fs = require('fs');
var myTimer;
// подключенные клиенты
var clients = {};
//var dataBuild;

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({port: 8082});
webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  console.log("New connection " + id);

  ws.on('message', function(message) {
    console.log('Message is received ' + message);
    var url;
    if (message=='getJobInfo') {
      url = 'data/build.json';
      openFile(ws, url);
    }
    if (message=='echoTest') {
      ws.send('{"answer": "'+ message +'"}');
    }
  });

  ws.on('close', function(event) {
    if (event.wasClean) {
      console.log('Clean closed connection.')
    } else {
      console.log('Fall connection. Reason: ' + event.reason)
    }
    console.log('Connection is closed ' + id);
    clearTimeout(myTimer);
    delete clients[id];
  });

  ws.on('error', function(error) {
    console.log('Error is: ' + error.message)
  });

});

// обычный сервер (статика) на порту 8080
var fileServer = new Static.Server('.');
http.createServer(function (req, res) {
  fileServer.serve(req, res);
}).listen(8085);

function sendJson(ws, dataBuild) {
  var inc = 0;
  var length = dataBuild.posts.length;
  myTimer = setInterval(function() {
    var post = JSON.stringify(dataBuild.posts[inc]);
    ws.send(post);
    if (inc==(length-1)) {
      console.log('request is done');
      stopTimer();
    }
    inc++;
  },10)

}

function stopTimer() {
  clearTimeout(myTimer);
}

function openFile(ws, url) {
  fs.readFile(url, 'utf-8', function (error, data) {
    if (error) {
      return console.log(error);
    }
    dataBuild = JSON.parse(data);
    sendJson(ws, dataBuild);
  });
}

console.log("Server is running on 8082");
