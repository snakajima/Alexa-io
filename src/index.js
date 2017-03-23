const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');

const serverPort = 8080;
var server = require('http').createServer(app);

server.listen(serverPort, () => {
   console.log('listening on *:' + serverPort);
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../html') });
});
app.get('/html/:filename', (req, res) => {
    res.sendFile(req.params.filename, { root: path.join(__dirname, '../html') });
});
app.get('/css/:filename', (req, res) => {
    res.sendFile(req.params.filename, { root: path.join(__dirname, '../css') });
});
app.get('/js/:filename', (req, res) => {
    res.sendFile(req.params.filename, { root: path.join(__dirname, '../js') });
});

const io = require('socket.io')(server);
const chatrooms = require('./chatrooms');
chatrooms(io);

app.get('/ping', (req, res) => {
  console.log('ping');
  io.sockets.in('Lobby').emit('/room/message', { cmd:'ping' });
  res.sendFile('success.json', { root: path.join(__dirname, '../js') });
});

app.post('/intent', jsonParser, (req, res) => {
  console.log('intent', req.body);
  io.sockets.in('Lobby').emit('/room/message', { cmd:'intent', intent:req.body });
  res.sendFile('success.json', { root: path.join(__dirname, '../js') });
});
