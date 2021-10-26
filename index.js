const app = require('./server');
const mongoose = require('mongoose')
require('dotenv').config({ path: __dirname + "./env" });
const port = process.env.PORT || 3001;
const connectionUrl = process.env.CONNECTION_URL;
const {instrument} = require('@socket.io/admin-ui')

const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin:["http://localhost:3000","https://admin.socket.io"]} })


io.on('connection', socket => {
    console.log(socket.id)
    socket.on('join-room', room => {
        socket.join(room)
    })

    socket.on('say-hi', (dogs)=> {
        console.log(dogs)
    })
})

mongoose.connect(connectionUrl)
    .then(() => server.listen(port, () => console.log(`express shooting off at ${port}`)))
    .catch((err) => console.log('err'))

instrument(io, {auth:false})


// socket.emit is in join room button join and create