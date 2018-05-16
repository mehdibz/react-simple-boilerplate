// WARNING The example code from the ws documentation
// uses unconventional variable names.
// This messes with bootcamp students every month...
const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

let id = 1;
const getId = () => {
  const nextId = id;
  id = id + 1;
  return nextId;
};

wss.on('connection', function connection(socket) {
  // Unlike on the client/browser, ws uses `.on()`
  // and the function gets a string, not an object
  socket.on('message', function incoming(message) {
    const messageObject = {
      id: getId(),
      text: message,
    };
    wss.broadcast(JSON.stringify(messageObject));
  });
});