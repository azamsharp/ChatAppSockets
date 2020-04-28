

const path = require('path')

const express = require('express')

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use("/js",express.static("js"))

let messages = []

io.on('connection',(socket) => {
  console.log("Welcome to Chat...")
  //io.sockets.emit('houston',messages)

  socket.on('houston',(data) => {
    console.log(data)
    //messages.push(data)
    //socket.emit('houston',data)
    //socket.broadcast.emit('houston',data)
    io.sockets.emit('houston',data)
  })

})

app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname+'/chat.html'))
})

server.listen(3000);
