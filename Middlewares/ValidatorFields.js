const { validationResult } = require('express-validator');



const validationFields = (req, res, next) => {

    const err = validationResult(req);
    
    if (!err.isEmpty()) {
        return res.status(404)
                  .json({
                    message: err.mapped(),
                    status: false
                });
    }

    next();
}





module.exports = validationFields;