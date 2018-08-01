var socket = io();
socket.on('connect',function(){
  socket.emit('createEmail',{
    to:"gen@example.com",
    text:"HEY how are you?"
  })

  // socket.emit('createMessage',{
  //   name:"Sarthak Sharam",
  //   text:"Yo!! this goes form client ..."
  // })

  console.log("Connected To server");
});

socket.on('disconnect',function(){
  console.log("Disconnected from server");
});

socket.on('newEmail',function(email){
  console.log("New Email",email);
});

socket.on('newMessage',function(message){
  console.log("New Message",message);
})
