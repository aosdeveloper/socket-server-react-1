// servidor de express
const express = require('express'); 
//servidor de sockets
const http = require('http');

const io = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor(){
        this.app = express();

        this.port = process.env.PORT;

        // http server
        this.server = http.createServer( this.app );

        // configuraciones de sockets
        this.io = io( this.server, { /*configuraciones*/ } );
    }

    middlewares(){
        this.app.use( express.static( path.resolve( __dirname, '../public') ) );
    }

    configurarSockets(){
        new Sockets( this.io );
    }

    execute(){
        // inicializar middlewares
        this.middlewares();

        // inicializar sockets
        this.configurarSockets();

        // inicializar server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto: ', this.port);
        })
    }
}

module.exports = Server;