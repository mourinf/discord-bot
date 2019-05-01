const Discord = require("discord.js");

module.exports = {
    name: "stop",
    description: "Leave a vocal channel.",
    execute(message, args, client) {
        for(var channel of client.channels) {
            if (channel[1].type === 'voice') {
                if(channel[1].members.has(client.user.id)) {
                    channel[1].leave();
                    message.channel.send(`Oui bon ok je pars...`);
                }
                else {
                    message.channel.send(`Je n'ai même pas parlé...`);
                }
            }
        }
    },
};