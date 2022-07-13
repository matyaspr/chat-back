/*
    Path para acceder a la autenticación
    http://localhost:8080/api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, newUser, renewToken } = require('../Controller/AuthController');
const { validationFields, validateJWT } = require('../Middlewares/index');
const router = Router();




router.post('/',
            [
                check('email', 'El email es obligatorio').isEmail() ,
                check('password', 'El password es obligatorio').not().isEmpty(),
                validationFields
            ], 
            login );

router.post('/new', 
            [
                check('name', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail() ,
                check('password', 'El password es obligatorio').not().isEmpty(),
                validationFields
            ],    
            newUser );

router.get('/revalidate',
            validateJWT,
            renewToken );









module.exports =  router ;



