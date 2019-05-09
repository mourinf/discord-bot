const fs = require("fs");

module.exports = {
  name: "play",
  description: "Play sound from sound folder.",
  execute(message, args) {
    const { voiceChannel } = message.member;
    let soundExist = false;
    const contentFolder = fs.readdirSync("./resources/sounds");
    if (args[0] === '--help') {
        response = "Voici la liste des titres de ma bibliothèque :\n";
        contentFolder.forEach(file => {
            const soundName = file.substring(0, file.length - 4);
            response = response + `- ${soundName}\n`;
        });
        message.channel.send(response);

    }
    else {
        if (voiceChannel !== undefined) {
        // Check if the sound exist
        contentFolder.forEach(file => {
            const soundName = file.substring(0, file.length - 4);
            if (args[0] === soundName) {
            soundExist = true;
            }
        });
        if (soundExist) {
            voiceChannel.join().then(connection => {
            const dispatcher = connection.playFile(`./resources/sounds/${args[0]}.mp3`);
            dispatcher.on("end", () => {
                voiceChannel.leave();
            });
            });
        } else {
            message.channel.send(`Le son ${args[0]} n'existe pas.`);
        }
        } else {
        message.channel.send("Tu n'es pas dans un chan vocal.");
        }
    }
  }
};