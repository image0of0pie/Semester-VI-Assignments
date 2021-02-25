const io = require("socket.io")(3000); // starts the server at the port 3000
const users = {}; // to store all the users list

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", ({ message, image, time }) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      image: image,
      name: users[socket.id],
      time: time,
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
  });
});
