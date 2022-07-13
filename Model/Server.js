const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Socket = require('../Model/Socket');
const cors = require('cors');
const { dbConnection } = require('../Database/Config');





// clase para inicializar el server y configurar los sockets
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Http Server
        this.server = http.createServer( this.app );

        dbConnection();

        // config de socket
        this.io = socketio( this.server, {  } );

    }


    middleware() {
        this.app.use( express.static( path.resolve( __dirname, '../Public') ) )

        this.app.use( cors() );

        // parsear el body de las peticiones
        this.app.use( express.json() );

        this.app.use( '/api/login', require('../Router/Auth') );
        this.app.use( '/api/message', require('../Router/Message') );
    }


    socketConfig() {
        new Socket( this.io );   // enviamos por referencia el socket


    }



    execute() {

        this.middleware();

        this.socketConfig();

        this.server.listen( this.port, () => {
            console.log('Server corriendo en el puerto: ' + this.port);
        });
    }

}



module.exports = Server;