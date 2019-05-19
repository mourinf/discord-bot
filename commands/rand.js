module.exports = {
    name: "rand",
    description: "Chose randomly a name among those specified",
    execute(message, args, client) {
        if (args.length > 0) {
            rand = Math.floor(Math.random() * args.length);
            message.channel.send(`Je vous suggère ${args[rand]}!`);
        }
        else {
            message.channel.send(`Il s'agierait de préciser des valeurs...`);
        }
    }
};