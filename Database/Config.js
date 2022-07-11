const  mongoose  = require("mongoose");


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONECTION_STRING, );
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    dbConnection
}