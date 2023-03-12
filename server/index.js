const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet'); // v1.0.5
const cors = require('cors');
const { Server } = require('socket.io');

require('dotenv').config();

const users = require('./routers/users');
const videos = require('./routers/videos');
const auth = require('./routers/auth');
const upload = require('./routers/upload');
const comments = require('./routers/comments');
const messages = require('./routers/messages');
const conversations = require('./routers/conversations');
const notifications = require('./routers/notifications');

const app = express();

// Connect to DB
const db = require('./config/db');
db.connect();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
        litmit: '30mb',
    }),
);
app.use(
    express.json({
        limit: '30mb',
    }),
);
app.use(helmet());
app.use(cors());

app.use('/api/users', users);
app.use('/api/videos', videos);
app.use('/api/auth', auth);
app.use('/api/upload', upload);
app.use('/api/comments', comments);
app.use('/api/messages', messages);
app.use('/api/conversations', conversations);
app.use('/api/notifications', notifications);

// Cookies
app.use(cookieParser());
app.get('/get-cookies', (req, res) => {
    // req.cookies
    res.json(req.cookies.username);
});
app.get('/set-cookies', (req, res) => {
    res.cookie('username', 'lekhanh');
    res.cookie('newUser', true);

    res.send('You create cookies');
});

app.listen(process.env.API_PORT, () => {
    console.log(`API listening on port ${process.env.API_PORT}`);
});

/* SOCKET IO */
const IO_PORT = process.env.SOCKETIO_PORT;
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://tiktok-lekhanh.web.app'],
    },
});

let onlineUsers = [];

const addUser = (userID, socketID) => {
    !onlineUsers.some((user) => user.userID === userID) &&
        onlineUsers.push({ userID, socketID });
};

const removeUser = (socketID) => {
    onlineUsers = onlineUsers.filter((user) => user.socketID !== socketID);
};

const getUser = (userID) => {
    return onlineUsers.find((user) => user.userID === userID);
};

io.on('connection', (socket) => {
    // When connected
    console.log('a user connected');
    // Take userID & socketID
    socket.on('addUser', (userID) => {
        addUser(userID, socket.id);
        io.emit('getUsers', onlineUsers);
    });

    // When disconnected
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', onlineUsers);
    });

    // Send and get message
    socket.on('sendMessage', ({ receiver, ...other }) => {
        const user = getUser(receiver);
        if (user) {
            io.to(user.socketID).emit('getMessage', other);
        }
    });

    // Send and get notifications
    socket.on('sendNotification', (data) => {
        const user = getUser(data.receiver);
        const isNotOwn = data.receiver !== data.sender._id;

        if (user && isNotOwn) {
            io.to(user.socketID).emit('getNotification', data);
        }
    });
});

server.listen(IO_PORT, () => {
    console.log(`Socket.IO server running at http://localhost:${IO_PORT}`);
});
