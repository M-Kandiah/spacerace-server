const app = require('./server');
const mongoose = require('mongoose')
require('dotenv').config({ path: __dirname + "./env" });
const port = process.env.PORT || 3001;
const connectionUrl = process.env.CONNECTION_URL;
const {instrument} = require('@socket.io/admin-ui')

const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin:["http://localhost:3000","https://admin.socket.io","https://brainifyquiz.netlify.app/"]} })


io.on('connection', socket => {
    
    socket.on("join-room", (roomId, user) => {
        console.log(`Server : Someone joined room ${roomId}`);
        console.log(user)//
        socket.join(roomId);
        socket.to(roomId).emit(`joined-room`, roomId, user);
      });

      socket.on("start-game", (room, url) => {
        console.log(`now in start game`);
        console.log(io.sockets.name)
        io.emit(`start`, room, url);
        
      });

      socket.on('sendData', (question,answers,correctAnswer) => {
          io.emit('sent', question,answers,correctAnswer)
      })

})

mongoose.connect(connectionUrl)
    .then(() => server.listen(port, () => console.log(`express shooting off at ${port}`)))
    .catch((err) => console.log(err))

instrument(io, {auth:false})