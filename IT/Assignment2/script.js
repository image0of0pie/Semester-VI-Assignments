const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling", "flashsocket"],
}); // join the server on 3000 port

const messageContainer = document.getElementById("message-container"); // contains the messages
const messageForm = document.getElementById("send-container"); // the form to send a message
const messageInput = document.getElementById("message-input"); // form for typing the message
var imageMessage = null; // form for taking image input

function appendMessage(textMessage, imageMessage, date, userName) {
  const messageElement = document.createElement("div"); // to update the message chat list
  messageElement.setAttribute("class", "container");
  if (userName) {
    const titleElement = document.createElement("h4");
    if (userName === "You") {
      messageElement.style.backgroundColor = "rgb(235, 245, 245)";
    }
    titleElement.innerText = userName;
    messageElement.appendChild(titleElement);
  }
  if (imageMessage) {
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", imageMessage);
    messageElement.appendChild(imageElement);
  }
  if (textMessage) {
    const textElement = document.createElement("p");
    textElement.innerText = textMessage;
    messageElement.appendChild(textElement);
  }
  if (date) {
    const dateElement = document.createElement("span");
    dateElement.setAttribute("class", "time-right");
    dateElement.innerText = date;
    messageElement.appendChild(dateElement);
  }
  messageContainer.append(messageElement);
}

function appendJoins(message, self) {
  const messageElement = document.createElement("div");
  messageElement.style.marginTop = "10px";
  if (self) {
    messageElement.style.backgroundColor = "rgb(235, 245, 245)";
  }
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

const userName = prompt("What is your name?"); // take user's name as input
appendJoins("You joined", true);
socket.emit("new-user", userName); // emit that this user has joined

socket.on("chat-message", (data) => {
  appendMessage(data.message, data.image, data.time, data.name); // on receiving a new message
});

socket.on("user-connected", (userName) => {
  appendJoins(`${userName} connected`); // on new user connected
});

socket.on("user-disconnected", (userName) => {
  appendJoins(`${userName} disconnected`); // on a user disconnected
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const textMessage = messageInput.value;
  appendMessage(
    textMessage,
    imageMessage,
    new Date(Date.now()).toLocaleTimeString(),
    "You"
  );
  socket.emit("send-chat-message", {
    message: textMessage,
    image: imageMessage,
    time: new Date(Date.now()).toLocaleTimeString(),
  }); // sending own message includes rendering on self page and sending to server
  messageInput.value = "";
  document.getElementById("output").src = "";
  imageInput = null;
});

function loadFile(event) {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    imageMessage = reader.result;
  };
  reader.readAsDataURL(file);
  document.getElementById("output").src = URL.createObjectURL(file);
}
