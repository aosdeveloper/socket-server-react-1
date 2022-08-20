class Sockets {
    constructor( io ) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents(){

        // On connection
        this.io.on('connection', (socket) => {
            
            // escuchar evento
            socket.on('mensaje-to-server', (data) => {
                console.log(data);
                // a todos los conectados
                this.io.emit('mensaje-from-server', data);
            })
        });
    }
}

module.exports = Sockets;