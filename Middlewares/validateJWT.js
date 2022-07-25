const jwt = require("jsonwebtoken");



const validateJWT = (req, res, next) => {
    try {
        const token = req.header("x-token");
        if (!token) {
            return res.status(401).json({
                message: "No hay token",
                status: false
            });
        }

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

    } catch (error) {
        return res.status(500).json({
            message: "Token no valido",
            status: false
        });
    }

    next();
}



module.exports =  validateJWT ;