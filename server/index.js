// const ws = require("ws");
// const server = new ws.Server({ port: 3000 });

// server.on("connection", (socket) => {
//   console.log("got a connection request");
//   socket.on("message", (message) => {
//     const b = Buffer.from(message);
//     console.log(b.toString());
//     socket.send(`${message}`);
//   });
// });

const ws = require("ws");

const wss = new ws.WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (message) => {
    console.log("received: %s", message);
    ws.send(message.toString());
  });
});
