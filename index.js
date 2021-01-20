var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen("3000", () => {
  console.log("now listing on port 3000");
});

app.use(express.static("public"));

var io = socket(server);

io.on("connection", socket => {
  console.log("made socket connection", socket.id);
  console.log(socket.client.conn.server.clientsCount + " users connected");
  io.sockets.emit("usersOnline", socket.client.conn.server.clientsCount);
  socket.on("chat", data => {
    console.log("recieved data", data);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    console.log(data, "is typing");
    socket.broadcast.emit("typing", data);
  });
});
