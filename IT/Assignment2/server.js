const io = require("socket.io")(3000); // starts the server at the port 3000
const messageStore = {};
const authStore = {};
io.on("connection", (socket) => {
  socket.on("new-user", ({ name, password }) => {
    if (name in authStore) {
      if (authStore[name] === password) {
        socket.emit("connection-status", {
          status: true,
          message: "Testing Srestha's code style",
        });
        socket.broadcast.emit("user-connected", name);
        const messagesPrevious = messageStore[name];
        socket.join(name);
        io.emit("users-list", Object.keys(authStore));
        io.to(name).emit("prev-chat-message", messagesPrevious);
      } else {
        socket.emit("connection-status", {
          status: false,
          message: "Testing Srestha's code style",
        });
      }
    } else {
      authStore[name] = password;
      messageStore[name] = [];
      socket.emit("connection-status", {
        status: true,
        message: "Testing Srestha's code style",
      });
      socket.broadcast.emit("user-connected", name);
      socket.join(name);
      io.emit("users-list", Object.keys(authStore));
    }
  });
  socket.on("chat-message", ({ message, image, time, name, recipients }) => {
    messageStore[name].push({ message, image, time, name: "You" });
    if (name in authStore) {
      for (idx = 0; idx < recipients.length; idx++) {
        const receiver = recipients[idx];
        if (receiver === name) {
          continue;
        }
        messageStore[receiver].push({ message, image, time, name });
        io.to(recipients[idx]).emit("chat-message", {
          message,
          image,
          time,
          name,
        });
      }
    }
  });
  socket.on("disconnect", () => {
    // io.emit("user-disconnected", usersOnline[socket.id]);
    io.emit("users-list", Object.keys(authStore));
  });
});
