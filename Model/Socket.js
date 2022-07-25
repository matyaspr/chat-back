const { userConnected,
        getUsers,
        saveMessage,
        userDisconnected } = require("../Controller/SocketController");
const { validateJWT } = require("../Helper/jwt");



class Socket {

    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }


    socketEvents() {

        // On connection
        this.io.on('connection', async( socket ) => {

            // evaluamos la informacion del socket
            const token = socket.handshake.query['token'];
            const { status, uid } = validateJWT( token );

            if ( !status ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            const user = await userConnected( uid );
            // console.log(user.name + ' se ha conectado');

            //TODO: Unir al usuario a una sala de socket.io
            socket.join( uid );

            
            //TODO: validar el jwt
            // si el token no es valido, desconectar el jwt

            
            //TODO: saber que usuario esta activo mediante el uid
            
            
            
            //TODO: emitir todos los usuarios conectados
            this.io.emit('list-users', await getUsers() );

            
            //TODO: socket join a una sala particular

            
            
            //TODO: escuchar cuando el cliente manda un mensaje personal
            socket.on( 'personal-message', async( payload ) => {
                const msg = await saveMessage( payload );
                console.log({msg});
                this.io.to(payload.to).emit('personal-message', { msg } );   //emite el mensaje a la sala q tiene el uid correspondiente
                this.io.to(payload.from).emit('personal-message', { msg } );   //emite el mensaje a la sala q tiene el uid correspondiente
            })



            //TODO: disconnect user from
            socket.on('disconnect', async() => {
                // console.log(user.name + ' se ha desconectado');
                await userDisconnected( uid );
                this.io.emit('list-users', await getUsers() );
            });

            //TODO: emitir todos los usuarios conectados.
        } );
    }


}



module.exports = Socket;