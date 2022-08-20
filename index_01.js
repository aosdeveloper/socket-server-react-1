// servidor de express
const express = require('express'); 
const app = express();

//servidor de sockets
const server = require('http').createServer(app);

// configuracion del socket server
const io = require('socket.io')(server);

// desplegar el directorio publico
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('cliente conectado!');
    console.log(socket.id);
    socket.emit('mensaje-bienvenida', {
        msg: 'bienvenido al servidor',
        fecha: new Date()
    });

    socket.on('mensaje-cliente', (data) => {
        console.log('mensaje recibido')
        console.log(data);
    });

    socket.on('mensaje-to-server', (data) => {
        console.log(data);
        //solo al que envio mensaje
        socket.emit('mensaje-from-server', data); 
        // a todos los conectados
        io.emit('mensaje-from-server', data);
    })
});

server.listen(8080, () => {
    console.log('Server corriendo en puerto: 8080');
});