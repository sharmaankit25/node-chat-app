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

socket.on('newLocationMessage',function(message){
  var li = $('<li></li>');
  var a = $('<a target="_blank">Go to Location</a>')
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  $('#messages').append(li);
});

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

var locationButton = $('#send-location');
locationButton.on('click',function(e){
  if(!navigator.geolocation){
    return alert("No geolocation supported by your browser");
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
    console.log(position.coords);
  },function(){
    alert("Unable to fetch location");
  });
});
