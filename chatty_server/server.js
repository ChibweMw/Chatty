const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

const wss = new SocketServer.Server({ server });

let userCount = 0;

const colorPicker = () => {
  let colors = ["darkslateblue", "crimson", "orange", "purple", "limegreen"]
  let userColor = Math.floor(Math.random() * colors.length)
  return colors[userColor];
}

function broadcast(data) {
  const payload = JSON.stringify(data);
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(payload);
    }
  });
}

function broadcastUserCount() {
  broadcast({ type: 'userCounter', content: wss.clients.size });
}

wss.on('connection', (client) => {
  console.log('Client connected');
  const color = colorPicker();
  broadcastUserCount();

  client.on('close', () => {
    broadcastUserCount();
  });


  client.on('message', function incoming(data) {

    const incomingMessage = JSON.parse(data);

    switch(incomingMessage.type) {
      case "postMessage":
        broadcast({
          type: "incomingMessage",
          id: uuidv1(),
          username: incomingMessage.username,
          content: incomingMessage.content,
          color: color
        });
        break;
      case "postNotification":
        broadcast({
          type: "incomingNotification",
          id: uuidv1(),
          content: incomingMessage.content
        });
        break;
      case "postImage":
        broadcast({
          type: "incomingImage",
          id: uuidv1(),
          username: incomingMessage.username,
          content: incomingMessage.content,
          image: incomingMessage.image,
          color: color
        })
    }
  });
});
