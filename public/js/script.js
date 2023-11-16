const chatbox = document.querySelector(".chatbox");
const chatarea = document.querySelector(".chat-area");
const audio = new Audio("ring.mp3")
const input_val=document.querySelector("input"); 
const button=document.querySelector(".send");
const socket = io('')
 
// asking user for the username
let username = prompt("username")
 
// SENDING EVENTS TO THE SERVER
socket.emit("new_user_joined", username)
socket.on("user-joined",(username)=>{
    displayMessage(username,"has joined the chat");
})
socket.on("user-left",(username)=>{
    displayMessage(username,"has left the chat");
})
button.addEventListener("click",()=>{
    if(input_val.value!="" || input_val.value!=null){
        displayMessage(username,input_val.textContent);
        socket.emit("send",input_val.value);
        input_val.value="";
    }
})
socket.on("chat", data => {
    audio.play()
    displayMessage(data.username, data.msg);
    chatarea.scrollTop = chatarea.scrollHeight
    chatarea.scrollTop = chatarea.scrollHeight
})

const enterKeyPressed=(event)=>{
    // event.preventDefault();
    if(event.keyCode==13){
        console.log(input_val.value);
        displayMessage(username,input_val.value);
        socket.emit("send",input_val.value);
        input_val.value="";
    }
}

 
function displayMessage(user, msg) {
    const div = document.createElement("div");
    const div1 = document.createElement("div");
    const inputString = username;
    const outputString1 = inputString.slice(0, 1);
    div1.classList.add("message_box");
    div1.innerHTML = `  <div class="chat-smg-img">
    <div class="img bg-color">
        <span class="img-color">${outputString1}</span>
    </div>
</div>
<div class="chat-msg-content">
    <div class="chat-msg-name">
        <div class="msg-name user">
            <h6 class="user">
                ${user}
            </h6>
        </div>  
     </div>
     <div class="chat-msg-text chat_message">
        <p>
            ${msg}
        </p>
        </div>
    </div>
    `
    
    chatarea.appendChild(div1)
}