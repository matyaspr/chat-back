const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const { generateJWT } = require("../Helper/jwt");
const Message = require("../Model/MessageModel");



const getChat = async (req = request, res = response) => {
    const originId = req.uid;
    const messageFrom = req.params.from;
    const LAST_MESSAGE_LIMIT = 30;
    
    const lastMessages = await Message.find({
        $or: [
            { from: originId, to: messageFrom },
            { from: messageFrom, to: originId }
        ]
    })
    .sort({ createdAt: 'desc' })
    .limit(LAST_MESSAGE_LIMIT);

    res.json({
        status: "success",
        message: lastMessages
    });
}








module.exports = {
    getChat

};