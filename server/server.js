const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicpath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); //web sockets server
var users = new Users();

app.use(express.static(publicpath));

io.on('connection', function (socket)  {   //Register an event listener -- listen for specific event
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app')); //emits an event specifically to one user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));//sends the message to everyone connected to the socket server, expect the current user
        callback();
    }); 

    socket.on('createMessage', (newMessage, callback) => {
        console.log('Message created', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));  //emits an event to every single connection
        callback();
    });

    socket.on('createLocationMessage', (coords) =>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', function ()  {
        var user = users.removeUser(socket.id);

        if (user){
        io.to(user.room).emit('updateUserList', users.getUserList(user.room)); //update users list
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the conversation`));
        }
    });
}); 

server.listen(port,() =>{
    console.log(`Server is up on ${port}`);
  });
