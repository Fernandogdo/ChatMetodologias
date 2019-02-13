'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors");
const docenteRoutes = require('./routes/docente');
const chatRoutes = require('./routes/chat');
const glosarioRoutes = require('./routes/glosario');
const passport = require('passport');
const morgan = require('morgan');
const app = express();
var http = require('http').createServer(app)

var io = require('socket.io')(http);

const router = express.Router();

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(express.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

//CORS
app.use(cors());
io.set('origins', '*:*');

//Rutas
app.use('/api/', docenteRoutes);
app.use('/api/salaChat/', chatRoutes);
app.use('/api/glosario/', glosarioRoutes);

var contadorUsuarios = 0;
const documents = {};

// contadorUsuarios++;
io.on("connection", (socket) => {

    console.log('Usuario conectado');

    socket.on("message", (m) => {
        // emitir un evento a todos los sockets conectados
        io.emit('message', m);
    });

    socket.on('nuevoRoom', sala => {
        console.log('Nueva sala: ',sala)
        socket.join(sala);
    });
    socket.on('mensaje', (obj) => {
        // sending to all clients in 'sala' room, including sender
        io.in(obj.sala).emit('mensaje',obj.message);
        console.log(socket.rooms)
    });
    socket.on("disconnect", () => {
        console.log('desconectado');
    });

});




module.exports = http;
