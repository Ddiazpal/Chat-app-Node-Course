const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicpath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); //web sockets server


app.use(express.static(publicpath));

io.on('connection', function (socket)  {   //Register an event listener -- listen for specific event
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (newMessage) => {
        console.log('Message created', newMessage);

        io.emit('newMessage', {  //emits an evnet to every single connection
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        }); 

     /*   socket.broadcast.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });*/
    });

    socket.on('disconnect', function ()  {
        console.log('User disconnected');
    });
}); 

server.listen(port,() =>{
    console.log(`Server is up on ${port}`);
  });
