const User = require('../Model/UserModel');
const Message = require('../Model/MessageModel');


const userConnected = async( uid ) => {
    const user = await User.findById( uid );
    user.online = true;
    await user.save();

    return user;
}


const userDisconnected = async( uid ) => {
    const user = await User.findById( uid );
    user.online = false;
    await user.save();

    return user;
}


const getUsers = async() => {
    const users = await User.find().sort('-online');
    
    return users;
}


const saveMessage = async( payload ) => {

    try {
        const message = new Message( payload );
        await message.save();
        return message;
    } catch (error) {
        console.log(error);
        return false;
    }

    // const user = await User.findById( payload.uid );
    // user.messages.push( payload.message );
    // await user.save();

    // return user;
}



module.exports = {
    userConnected,
    userDisconnected,
    getUsers,
    saveMessage,

}