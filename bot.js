const fs = require("fs");
const Discord = require("discord.js");

const bot = new Discord.Client({ autoReconnect: true });
bot.commands = new Discord.Collection();

const config = require("./config/config.json");

// Init all command
const commandFiles = fs.readdirSync("./commands/");
commandFiles.forEach(file => {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
});


bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {

    if (!message.content.startsWith(config.startCommand)) return;
    if ("bot_commands" != message.channel.name && message.content != '!help') {
      message.reply("Fais ta demande dans le cannal 'bot_commands', s'il te plait");
      return;
    }
    let commandName;
    let args;
    if (!message.content.includes(`${config.startCommand}playlist`)) {
      args = message.content.slice(config.startCommand.length).split(/ +/);
      commandName = args.shift().toLowerCase();
    }
    else { //for the playlist command, we want to keep white char of music name. So we split on / char
      commandName = message.content.substr(config.startCommand.length, (message.content.indexOf(" ") - 1));      
      if (message.content.includes("--name=") && message.content.includes("--songs=")) {
          let playlistname = message.content.match(/--name=(.*) --songs=/g)[0];          
          playlistname = playlistname.replace(/--name=/g, "").replace(/ --songs=/g, "");
          let songList = message.content.match(/--songs=.*/g)[0].replace(/--songs=/g, "");
          args = songList.match(/[^\/]+/g);
          args ? args.unshift(playlistname) : playlistname;
      }
      else {
          message.reply("La commande playlist s'utilise de cette manière : \n !playlist --name=<playlistname> --songs=song1/song2/song3'");
          return;
      }
    }

    
    if (!bot.commands.has(commandName)) return;
  
    const command = bot.commands.get(commandName);
    try {
      command.execute(message, args, bot);
    } catch (error) {
      console.error(error);
      message.reply("Oups, je ne sais plus comment faire ça... désolé!");
  }
});

bot.login(config.token);

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur le serveur ' + member.displayName + '! Prends une bière, un café et mets toi à l\'aise!\n Tape **!help** pour connaitre les commandes')
    }).catch(console.error)
    // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
})