const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicpath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); //web sockets server


app.use(express.static(publicpath));

io.on('connection', function (socket)  {   //Register an event listener -- listen for specific event
    console.log('New user connected');

    socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createMessage', (newMessage, callback) => {
        console.log('Message created', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));  //emits an event to every single connection
        callback('This is from the server');

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
