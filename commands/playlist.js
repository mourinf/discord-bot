module.exports = {
    name: "playlist",
    description: "Create a custom youtube playlist",
    execute(message, args, client) {
        
        if (args && args.length > 1) {
            let rand = Math.floor(Math.random() * (args.length - 1));
            message.channel.send(`Je vais créer la playlist '${args[0]}'! Dedans il y aura plein de morceaux lourds comme "${args[1 + rand]}" par exemple !`);
            
            let tracks = [];

            tracks.push(args[1]);

            let tracksJoined = tracks.join("\n");
            let uri =
            "http://www.playlist-converter.net/#/?text=" +
            encodeURIComponent(tracksJoined) + "&name=" + encodeURIComponent(args[0]);

            message.channel.send(`Terminé! Follow ce lien : ${uri}`);    
        }
        else {
            message.channel.send("Fini! Voici le lien : https://il_ny_a_rien_dans_ta_playlist_n_essaie_pas_de_membrouiller.fr");
        }
      
    }
};