/*
    Path para acceder a los mensajes del chat
    http://localhost:8080/api/message

*/
const { Router } = require('express');
const router = Router();

const { getChat } = require('../Controller/MessageController');
const { validationFields, validateJWT } = require('../Middlewares/index');



router.get('/:from',
            [
                validateJWT
            ], 
            getChat );




module.exports =  router ;