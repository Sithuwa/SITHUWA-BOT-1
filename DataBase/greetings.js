*/ 
let DataPack = require('sithuwa-bot-pro');
let SewQueen = require('sithuwa-bot-pro/sources/dc/handler');
let Details = require('sithuwa-bot-pro/sources/dc/Details');
let { DataTypes } = require('sequelize');

const GreetingsDB = Details.DATABASE.define('Greeting', {
    chat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

async function getMessage(jid = null, tip = 'welcome') {
    var Msg = await GreetingsDB.findAll({
        where: {
            chat: jid,
            type: tip
        }
    });

    if (Msg.length < 1) {
        return false;
    } else {
        return Msg[0].dataValues;
    }
}

async function setMessage(jid = null, tip = 'welcome', text = null) {
    var Msg = await GreetingsDB.findAll({
        where: {
            chat: jid,
            type: tip
        }
    });

    if (Msg.length < 1) {
        return await GreetingsDB.create({ chat: jid, type: tip, message:text });
    } else {
        return await Msg[0].update({ chat: jid, type: tip, message:text });
    }
}

async function deleteMessage(jid = null, tip = 'welcome') {
    var Msg = await GreetingsDB.findAll({
        where: {
            chat: jid,
            type: tip
        }
    });

    return await Msg[0].destroy();
}

module.exports = {
    GreetingsDB: GreetingsDB,
    getMessage: getMessage,
    setMessage: setMessage,
    deleteMessage: deleteMessage
};
