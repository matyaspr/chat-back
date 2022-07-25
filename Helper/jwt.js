const jwt = require("jsonwebtoken");



const generateJWT = ( uid ) => {    
    return new Promise( ( resolve, reject ) => {
        const payload = { uid };
        const token = jwt.sign( payload, 
                                process.env.JWT_SECRET, 
                                { expiresIn: '36h' },
                                (err, token) => {
                                    if ( err ) {
                                        reject( err );
                                    } else {
                                        resolve( token );
                                    }
                                } );

    })
}



const validateJWT = ( token ) => {
    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        return {
            uid,
            status: true
        }

    } catch (error) {
        return {
            status: false,
            uid: null
        }
    }
}

module.exports = { 
    generateJWT,
    validateJWT 
};



