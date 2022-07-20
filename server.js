const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});

app.get("/", (req, res) => res.send("hello!"));

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("message-broadcast", msg);
  });
});
http.listen(3000, () => {
  console.log("listening on *:3000");
});
