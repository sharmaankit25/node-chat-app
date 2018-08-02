const path = require('path');
const  http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const  port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log("New User Connected");
  socket.emit('newMessage',generateMessage('Admin','Welcome to our app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New USer joined'));

  // socket.emit('newEmail',{
  //   from:"ankit@example.com",
  //   text:"Hey Wassup",
  //   createAt:123
  // });

  // socket.emit("newMessage",{
  //   name:"Ankit Sharma",
  //   message:"Hey this comes from server",
  //   createAt:123
  // });

  // socket.on('createEmail',(newEmail)=>{
  //   console.log(newEmail);
  // });

  socket.on('createMessage',(message,callback)=>{
    console.log(message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This is acknowledgement from server');
    // Emit message to all but not yourself
    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createAt:new Date().getTime()
    // });
  });

  socket.on('disconnect',(socket)=>{
    console.log("User Disconnected");
  });
});



server.listen(port,function() {
  console.log("Server started at port"+port);
});

module.exports = {app}
