/*
    Path para acceder a la autenticación
    http://localhost:8080/api/login

*/


const { Router } = require('express');
const router = Router();

router.post( '/', async (req, res) => {
    res.json({
        message: 'Login',
        status: 'success'
    });
});


router.post('/new', async (req, res) => {

    res.json({
        message: 'New user',
        status: 'success'
    });
});

// revalidar tokent
router.get('/revalidate', async (req, res) => {
    res.json({
        message: 'Revalidate token',
        status: 'success'
    });
});




module.exports =  router ;



