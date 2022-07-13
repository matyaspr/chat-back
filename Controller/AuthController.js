const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../Model/UserModel");
const { generateJWT } = require("../Helper/jwt");



const login = async (req = request, res = response ) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "El usuario no existe",
                status: "error"
            });
        }

        // veriificar password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "El password es incorrecto",
                status: "error"
            });
        }

        // generar jwt
        const token = await generateJWT(user._id);

        res.json({
            message: "El usuario se ha autenticado correctamente",
            status: "success",
            token,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }

}


const newUser = async (req, res = response ) => {
    try {
        const { email, password } = req.body;
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                message: 'El email ya existe',
                status: 'error'
            });
        }
        const user = new User( req.body );
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        // generar jwt 
        const token = await generateJWT( user._id );

        res.json({
            message: 'Usuario creado',
            status: 'success',
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }

}


// revalidar tokent
 const renewToken = async (req, res) => {
    
    const { uid } = req; // obtenido del middleware validateJWT
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    
    res.json({
        message: 'Revalidate token',
        status: 'success',
        user,
        token
    });
};











module.exports = {
    newUser,
    login,
    renewToken
}