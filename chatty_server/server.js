// server.js
const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let color = "";
let user = "";
wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.broadcast({
    NumberOfuser:wss.clients.size,
    messageType: "userCounter",
  });
  
  //reading messages
   ws.on('message', function incomingMessages(message) {
    const clientMessage = JSON.parse(message);
    let msgObject = {};
    user = clientMessage.username;
    switch(clientMessage.messageType){
      case "message" :
        msgObject = {
          id: uuidv1(),
          username: clientMessage.username,
          content: clientMessage.message,
          messageType: clientMessage.messageType,
          messageColor: clientMessage.messageColor
        };
      break;
      case "notification":
        msgObject = {
          id: uuidv1(),
          oldname: clientMessage.oldname,
          username: clientMessage.username,
          content: "** "+clientMessage.oldname+" ** changed their name to ** "+clientMessage.username+" **",
          messageType: clientMessage.messageType
        };
      break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event");
    }
    // console.log(msgObject.messageColor)
    wss.broadcast(msgObject);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast({
        NumberOfuser: wss.clients.size,
        messageType: "userCounter",
    });
    console.log('Client disconnected');
  });
});

// function for boardcast to all clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
