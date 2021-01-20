var socket = io.connect("http://192.168.1.4:3000");

var message = document.getElementById("message");
var handle = document.getElementById("handle");
var form = document.getElementById("form");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");
var usersOnline = document.getElementById("usersOnline");

form.addEventListener("submit", e => {
  e.preventDefault();
  console.log("clicked");
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});

message.addEventListener("keypress", () => {
  console.log(handle.value, "is typing");
  socket.emit("typing", handle.value);
});

socket.on("chat", data => {
  output.innerHTML += `<p><b>${data.handle}</b>: ${data.message}</p>`;
});

var timerHandle;
socket.on("typing", data => {
  feedback.innerHTML = data + " is typing";
  clearTimeout(timerHandle);
  timerHandle = setTimeout(() => {
    feedback.innerHTML = "";
  }, 1000);
});

socket.on("usersOnline", data => {
  usersOnline.innerHTML = `${data} users online!`;
});
