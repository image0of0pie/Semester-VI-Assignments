const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling", "flashsocket"],
}); // join the server on 3000 port
var userList = [];
var selfUserName;
var password;
const userNameInput = document.getElementById("user");
const passwordInput = document.getElementById("pass");
const messageContainer = document.getElementById("message-container"); // contains the messages
const messageForm = document.getElementById("send-container"); // the form to send a message
const messageInput = document.getElementById("message-input"); // form for typing the message
const usersInput = document.getElementById("user-input");
const joinButton = document.getElementById("join");
var imageMessage = null; // form for taking image input

function renderUsers() {
  const userListRender = document.getElementById("onlineUserList");
  userListRender.innerHTML = "";
  for (idx = 0; idx < userList.length; idx++) {
    const list = document.createElement("li");
    list.innerText = userList[idx];
    userListRender.appendChild(list);
  }
}
function appendMessage(textMessage, imageMessage, date, userName, recipients) {
  const messageElement = document.createElement("div"); // to update the message chat list
  messageElement.style.marginTop = "10px";
  messageElement.setAttribute("class", "container");
  if (userName) {
    const titleElement = document.createElement("h4");
    if (userName === "You") {
      messageElement.style.backgroundColor = "rgb(150, 200, 200)";
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
  if (recipients) {
    const recipientsElement = document.createElement("p");
    var recipientList = "To ->  ";
    for (var idx = 0; idx < recipients.length; idx++) {
      recipientList = recipientList + " " + recipients[idx];
    }
    recipientsElement.innerText = recipientList;
    messageElement.appendChild(recipientsElement);
  }
  messageContainer.append(messageElement);
}
function appendJoins(message, self) {
  const messageElement = document.createElement("div");
  messageElement.style.marginTop = "10px";
  messageElement.style.height = "30px";
  messageElement.style.borderRadius = "10px";
  messageElement.style.alignSelf = "center";
  messageElement.style.width = "70%";
  if (self) {
    messageElement.style.backgroundColor = "rgb(235, 245, 245)";
  }
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
function handleJoin() {
  selfUserName = userNameInput.value;
  password = passwordInput.value;
  socket.emit("new-user", { name: selfUserName, password });
}
socket.on("connection-status", (data) => {
  if ((selfUserName === data.name) & (data.status === true)) {
    document.getElementById("username").innerText = selfUserName;
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("chatPage").style.display = "block";
    appendJoins("You joined this chatcord", true);
  }
});
socket.on("chat-message", (data) => {
  appendMessage(data.message, data.image, data.time, data.name); // on receiving a new message
});
socket.on("user-connected", (userName) => {
  appendJoins(`${userName} joined this chatcord`); // on new user connected
});
socket.on("user-disconnected", (userName) => {
  appendJoins(`${userName} left this chatcord`); // on a user disconnected
});
socket.on("users-list", (usersList) => {
  userList = usersList;
  renderUsers();
});
socket.on("prev-chat-message", (data) => {
  console.log(data);
  data.forEach((msg) =>
    appendMessage(msg.message, msg.image, msg.time, msg.name, msg.recipients)
  );
});
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const textMessage = messageInput.value;
  var recipients = usersInput.value;
  if (recipients === "") {
    recipients = userList;
  } else {
    recipients = recipients.split(",");
    for (idx = 0; idx < recipients.length; idx++) {
      recipients[idx] = userList[parseInt(recipients[idx])];
    }
  }
  for (idx = 0; idx < recipients.length; idx++) {}
  appendMessage(
    textMessage,
    imageMessage,
    new Date(Date.now()).toLocaleTimeString(),
    "You",
    recipients
  );
  socket.emit("chat-message", {
    message: textMessage,
    image: imageMessage,
    time: new Date(Date.now()).toLocaleTimeString(),
    name: selfUserName,
    recipients: recipients,
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
