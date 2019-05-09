const fs = require("fs");
const Discord = require("discord.js");

const bot = new Discord.Client({ autoReconnect: true });
bot.commands = new Discord.Collection();

const config = require("./config/config.json");

// Init all command
const commandFiles = fs.readdirSync("./commands/");
commandFiles.forEach(file => {
  const command = require(`./commands/${file}`); // eslint-disable-line
  bot.commands.set(command.name, command);
});


bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
    if (!message.content.startsWith(config.startCommand)) return;
    const args = message.content.slice(config.startCommand.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
  
    if (!bot.commands.has(commandName)) return;
  
    const command = bot.commands.get(commandName);
    try {
      command.execute(message, args, bot);
    } catch (error) {
      console.error(error);
      message.reply("there was an error trying to execute that command!");
  }
});

bot.login(config.token);

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur le serveur ' + member.displayName + '! Prends une bière, un café et mets toi à l\'aise!\n Tape !help pour connaitre les commandes')
    }).catch(console.error)
    // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
})