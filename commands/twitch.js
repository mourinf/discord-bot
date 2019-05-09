const http = require('http');
const config = require("../config/config.json");


module.exports = {
    name: "twitch",
    description: "Link twitch stream inside textual channel",
    execute(message, args, client) {
        if (args.length > 0) {
            message.channel.send(`https://www.twitch.tv/${args[0]}`);
        }
        else {
            message.channel.send(`Veuillez précisez le nom d'une chaine Twitch`);
        }
    }
};