const port = process.env.PORT || 3000


const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require('cors')
const io = require("socket.io")(server)
 
app.use(express.static("public"))
app.use(cors());
app.set("view engine", "ejs")
const activeUsers={}
io.on("connection",(socket)=>{
    socket.on("new_user_joined",(username)=>{
        activeUsers[socket.id]=username
        socket.broadcast.emit("user-joined",username);
    })
    socket.on("disconnect",(username)=>{
        console.log("user left",username);
        delete activeUsers[socket.id];
        socket.broadcast.emit("user-left",username);
    })
    socket.on("send",(message)=>{
        console.log(message);
        socket.broadcast.emit("chat", { username: activeUsers[socket.id], msg: message })
    })

})

app.get("/", (req, res) => {
    res.render("index")
})
 
server.listen(port, () => {
    console.log("Server connected")
})