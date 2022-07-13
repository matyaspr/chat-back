


class Socket {

    constructor( io ) {
        
        this.io = io;
        
        this.socketEvents();
    }


    socketEvents() {

        // On connection
        this.io.on('connection', ( socket ) => {

            //TODO: validar el jwt
            // si el token no es valido, desconectar el jwt

            //TODO: saber que usuario esta activo mediante el uid
            
            //TODO: emitir todos los usuarios conectados

            //TODO: socket join a una sala particular

            //TODO: escuchar cuando el cliente manda un mensaje personaliz

            //TODO: disconnect user from
            
            //TODO: emitir todos los usuarios conectados.
        } );
    }


}



module.exports = Socket;