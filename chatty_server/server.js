const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

const wss = new SocketServer.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  const userCount = wss.clients.size;

  console.log(`USERS LOGGED IN ${userCount}`);

  wss.broadcast = function broadcast(data) {
    console.log(data)
    wss.clients.forEach(function each(client) {
      if (client.readyState === SocketServer.OPEN) {
        client.send(JSON.stringify({type: "userCounter", content: data}));
      }
    });
  };

  wss.broadcast(userCount);

  ws.on('close', () => {
    console.log('Client disconnected')
    console.log(`USERS LOGGED IN ${userCount}`)
    wss.broadcast(userCount);
  });
  ws.on('message', function incoming(data) {

    const incomingMessage = JSON.parse(data);
    console.log(incomingMessage)

    wss.clients.forEach(function each(client) {
      if (client.readyState === SocketServer.OPEN) {
        switch(incomingMessage.type) {
          case "postMessage":
            client.send(JSON.stringify({
                                  type: "incomingMessage",
                                  id: uuidv1(),
                                  username: incomingMessage.username,
                                  content: incomingMessage.content
                                }));
            break;
          case "postNotification":
            client.send(JSON.stringify({
                                  type: "incomingNotification",
                                  id: uuidv1(),
                                  content: incomingMessage.content
                                }));
            break;
        }
        // client.send(JSON.stringify({
        //   type: "incomingNotification",
        //   id: uuidv1(),
        //   content: `${ws} `
        //   }));
        // }
      }
    });
  });
});
