const axios = require("axios");

module.exports = {
    name: "meteo",
    description: "Return the weather.",
    execute(message, args) {
        if (args.length > 0) {
            axios
            .get(`https://www.prevision-meteo.ch/services/json/${args[0]}`)
            .then(response => {
                let condition = args[1] && args[1] === "demain" ? response.data.fcst_day_1.condition : response.data.current_condition.condition;

                //Est-ce la nuit?
                if (condition.toLowerCase().includes("nuit")) {
                    message.react('🌃');
                }
                //Quel temps?
                if (condition.toLowerCase().includes("ensoleillé")) {
                    message.react('☀');
                }
                else if (condition.toLowerCase().includes("voilé") || condition.toLowerCase().includes("stratus") || condition.toLowerCase().includes("eclaircies")) {
                    message.react('🌤');
                }
                else if (condition.toLowerCase().includes("nuage")) {
                    message.react('☁');
                }
                else if (condition.toLowerCase().includes("orage")) {
                    message.react('🌩');
                }
                else if (condition.toLowerCase().includes("brouillard")) {
                    message.react('🌫');
                }
                else if (condition.toLowerCase().includes("averse")) {
                    message.react('🌦');
                }
                if (condition.toLowerCase().includes("pluie")) {
                    message.react('🌧');                        
                }
                if (condition.toLowerCase().includes("neige")) {
                    message.react('🌨');
                }

                //Send summary in chat
                if (args[1] && args[1] === "demain") {
                    message.channel.send(`https://www.prevision-meteo.ch/uploads/widget/${args[0]}_1.png\nCondition météorologique globale prévue : ${condition}`);
                }
                else {
                    message.channel.send(`https://www.prevision-meteo.ch/uploads/widget/${args[0]}_0.png\nCondition météorologique actuelle : ${condition}`);
                }
            })
            .catch(error => { 
                message.channel.send('Pas d\'info sur cette ville, désolé :(');
            });
        } else {
            message.channel.send("Il manque un paramètre [ville]");
        }
    }
  };