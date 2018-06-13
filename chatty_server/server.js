const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message', function incoming(data) {
    const incomingMessage = JSON.parse(data)
    incomingMessage.id = uuidv1();
    console.log(`${JSON.stringify(incomingMessage.username)} said ${JSON.stringify(incomingMessage.content)}`);
    // wss.clients.forEach(function each(client) {
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(data);
    // })
  })
});
