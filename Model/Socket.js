


class Socket {

    constructor( io ) {
        
        this.io = io;
        
        this.socketEvents();
    }


    socketEvents() {

        // On connection
        this.io.on('connection', ( socket ) => {

            //escuchar el evento
            socket.on('message-to-server', ( data ) => {
                    console.log(data);
                    //enviar el mensaje al cliente
                    this.io.emit('mensaje-from-server', data )
            });
        } )
    }


}



module.exports = Socket;