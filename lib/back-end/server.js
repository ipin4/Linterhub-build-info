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
  console.log("новое соединение " + id);

  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);
    var url;
    if(message=='getJobInfo') {
      url = 'data/build.json';
      openFile(ws, url);
    }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    clearTimeout(myTimer);
    delete clients[id];
  });

});

// обычный сервер (статика) на порту 8080
var fileServer = new Static.Server('.');
http.createServer(function (req, res) {

  fileServer.serve(req, res);

}).listen(8085);

function sendJson(ws, data){
  var inc = 0;
  var length = dataBuild.posts.length;
  myTimer = setInterval(function() {
    var post = JSON.stringify(dataBuild.posts[inc]);
    ws.send(post);
    if (inc==(length-1)) {
      post = JSON.stringify({"text":{"is":"done"}})
      ws.send(post);
      console.log('request is done');
      stopTimer();
    }
    inc++;
  },1000)

}

function stopTimer() {
  clearTimeout(myTimer);
}

function openFile(ws, url) {
  fs.readFile(url, 'utf-8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    dataBuild = JSON.parse(data);
    sendJson(ws, data);
  });
}

console.log("Сервер запущен на портах 8082");
