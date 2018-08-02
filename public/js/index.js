var socket = io();
socket.on('connect',function(){
  socket.emit('createEmail',{
    to:"gen@example.com",
    text:"HEY how are you?"
  })



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
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
})

socket.emit('createMessage',{
  from:"Sarthak Sharam",
  text:"Yo!! this goes form client ..."
},function(data){
  console.log("GOT It",data);
});

$('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text:$('[name="message"]').val()
  },function(data){
    console.log("GOT It",data);
  });
});
