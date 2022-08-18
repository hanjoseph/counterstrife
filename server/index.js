/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const express = require('express');

const app = express();
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const http = require('http');

const server = http.createServer(app);
require('dotenv').config();
const { Server } = require('socket.io');

const cors = require('cors');
const db = require('../database/index');

const {
  updateWins, updateGamesPlayed, checkinUser, getUser, getAllUsers, updateHighCount,
} = require('../database/controllers');

const io = new Server(server, {
  cors: {
    origin: `http://${process.env.SERV}`,
    methods: ['GET', 'POST'],
  },
});

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/public'), {
}));

// express listeners here
app.post('/users', (req, res) => {
  checkinUser(req.body)
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

app.get('/users', (req, res) => {
  const obj = { email: req.query.email };
  getUser(obj)
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

app.get('/allusers', (req, res) => {
  getAllUsers()
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

app.put('/userswin', (req, res) => {
  // updates user win tally.
  updateWins(req.body)
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});
app.put('/usersgame', (req, res) => {
  // updates user win tally.
  updateGamesPlayed(req.body)
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

app.put('/usersscore', (req, res) => {
  getUser(req.body)
    .then((response) => {
      // console.log(response);
      if (response.highest_count < req.body.score) {
        updateHighCount(req.body)
          .then((response) => res.send(response))
          .catch(((err) => console.log(err)));
      } else {
        res.send(response);
      }
    })
    .catch((err) => console.log(err));
});

// ------ socket io stuff below
const rooms = [];
const roomData = [];
let connectedClients = {};
let clientScores = {};
let interval;
let game = 'normal';
const hostQueue = [];

const sendUpdatedRoomData = (socket) => {
  socket.emit('getChatRoomData', roomData);
  socket.broadcast.emit('getChatRoomData', roomData);
};
const sendUpdatedScores = (socket) => {
  socket.emit('getScores', clientScores);
  socket.broadcast.emit('getScores', clientScores);
};

const sendConnectedClients = (socket) => {
  socket.emit('getConnectedClients', connectedClients);
  socket.broadcast.emit('getConnectedClients', connectedClients);
};

const sendUpdatedGame = (socket) => {
  socket.emit('getGame', game);
  socket.broadcast.emit('getGame', game);
};

const sendUpdatedHost = (socket) => {
  if (hostQueue.length >= 0) {
    const newHost = connectedClients[hostQueue[0]];
    if (!newHost === undefined) {
      console.log(newHost.email, 'is thehost!');
    }
    socket.emit('getHost', newHost);
    socket.broadcast.emit('getHost', newHost);
  }
};

io.on('connection', (socket) => {
  io.emit('rooms', rooms);
  io.emit('getChatRoomData', roomData);
  // io.emit('getGame', game);

  socket.on('userEnteredRoom', (userData) => {
    const temp = userData;
    temp.socket = socket.id;
    temp.count = 0;
    connectedClients[socket.id] = temp;
    hostQueue.push(socket.id);
    console.log(hostQueue);
    console.log('user', userData.displayName, 'has joined');
    console.log(connectedClients);
    const enteredRoomMessage = {
      message: `${userData.displayName} has entered the room`,
      username: '',
      photoURL: userData.photoURL,
      timeStamp: new Date(),
    };
    roomData.push(enteredRoomMessage);
    if (hostQueue.length === 1) {
      const newHostMsg = {
        message: `${connectedClients[hostQueue[0]].displayName} is the new host.`,
        username: '',
        photoURL: connectedClients[hostQueue[0]].photoURL,
        timeStamp: new Date(),
      };
      roomData.push(newHostMsg);
    }
    sendUpdatedRoomData(socket);
    sendConnectedClients(socket);
    sendUpdatedGame(socket);
    sendUpdatedHost(socket);
  });

  socket.on('SendMessage', (messageData) => {
    roomData.push(messageData);
    sendUpdatedRoomData(socket);
  });

  socket.on('gameStart', () => {
    io.emit('gameStart');
    clientScores = {};
    const temp = {};
    Object.values(connectedClients).forEach((client) => {
      const temps = client;
      temps.count = 0;
      temp[client.socket] = temps;
    });
    connectedClients = temp;
    sendConnectedClients(socket);
    sendUpdatedScores(socket);
  });
  socket.on('gameEnd', () => {
    io.emit('gameEnd');
    sendUpdatedScores(socket);
  });

  socket.on('switchGame', (data) => {
    game = data;
    sendUpdatedGame(socket);
    // console.log('emitted to all to switch game.');
  });

  socket.on('click', (user) => {
    if (clientScores[socket.id] === undefined) {
      clientScores[socket.id] = {
        displayName: user.displayName, count: 1, email: user.email, photoURL: user.photoURL,
      };
    } else {
      clientScores[socket.id].count++;
    }
    sendUpdatedScores(socket);
  });

  socket.on('clickmad', (owner) => {
    if (socket.id === owner.socket) {
      connectedClients[socket.id].count++;
    }
    if (socket.id !== owner.socket && connectedClients[owner.socket].count > 0) {
      connectedClients[owner.socket].count--;
    }
    clientScores = connectedClients;
    sendConnectedClients(socket);
    sendUpdatedScores(socket);
  });

  socket.on('collectScores', (userData) => { // receives scores.
    clientScores[socket.id] = userData;
    console.log(clientScores);
    sendUpdatedScores(socket);
  });

  socket.on('disconnecting', () => {
    console.log('Client disconnecting...');

    if (connectedClients[socket.id]) {
      const leftRoomMessage = {
        message: `${connectedClients[socket.id].displayName} has left the chat`, username: '', userID: 0, timeStamp: null,
      };
      roomData.push(leftRoomMessage);
      // remove from host queue.
      const prevHost = hostQueue[0];
      // let indexOfLeaving = hostQueue.indexOf(socket.id);
      hostQueue.splice(hostQueue.indexOf(socket.id), 1);
      const newHost = hostQueue[0];
      if (prevHost !== newHost && hostQueue.length > 0) {
        if (connectedClients[newHost]) {
          const newHostObj = connectedClients[newHost];
          const newHostMsg = {
            message: `${newHostObj.displayName} is the new host.`,
            username: '',
            photoURL: newHostObj.photoURL,
            timeStamp: new Date(),
          };
          roomData.push(newHostMsg);
        }
      }
      sendUpdatedRoomData(socket);
      console.log(hostQueue);
      sendUpdatedHost(socket);
      // send new host.
      sendUpdatedRoomData(socket);
      delete connectedClients[socket.id];
      sendConnectedClients(socket);
    }
    clearInterval(interval);
  });

  socket.on('load', () => {
    io.emit('getChatRoomData', roomData);
  });

  socket.on('startcountdown', () => {
    socket.broadcast.emit('startcountdown');
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
