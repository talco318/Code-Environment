const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const activeRooms = new Set();

app.use(cors())
let users = []
const codesArr = [{id : '1', code: ''}, {id:'2', code :''} , {id:'3', code :''}, {id:'4', code :''}, {id:'5', code :''}];
let SELECTED = '';
let msgs = '';

const getCodeList = ()=> {
    return codesArr.map((c)=>c.id)
}
socketIO.on('connection', (socket) => {
    socket.on('join room', (room) => {
        console.log('join room', room);
        if (!activeRooms.has(room)) {
            activeRooms.add(room);
            SELECTED = room;
        }
        socket.join(room);
    });

    socket.on('chat message', ({ room, msg }) => {
        socketIO.to(room).emit('chat message',  msg);
    });


    socketIO.emit("messageResponse", msgs);
    console.log(`⚡: ${socket.id} ${socket.selectedCodeId} user just connected!`);


    socket.on("newUser", data => {
      users.push(data)
        console.log(data)

        if (users.length === 1) {
            console.log("He is the teacher!");
        } else {
            console.log("He is the student!")
        }
      socketIO.emit("newUserResponse", users)
    })

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketID !== socket.id);
        if (users.length === 0) {
            console.log("No one is out there!");
        }

        console.log(`⚡: ${socket.id} user disconnected!`);
        socketIO.emit("newUserResponse", users);

        socket.disconnect();
    });
});

app.get("/get-code-blocks", (req, res) => {
  res.json(getCodeList())
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});