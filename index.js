const express = require('express'); // ERROR
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/start.html');
});

io.on('connection', (socket) => {
  socket.on('press', msg => {
    io.emit('sendFromServerKeyPressed', 'DIT KNOPJE IS INGEDRUK: '+msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});