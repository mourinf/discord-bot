module.exports = {
    name: "help",
    description: "Get summary of all existing commands and how to use them",
    execute(message, args, client) {
        message.channel.send(`Hello! Je suis Monsieur Larbin, le bot du channel! Je suis là pour vous faire passer un bon moment sur le serveur.\n Voici une liste de ce que je sais faire (pour l'instant) :\n
            !play [soundname] -> Joue le son 'soundname' de la bibliothèque. Passe --help en argument pour connaitre le contenu de la bibliothèque\n
            !stop -> Retire le bot du channel vocal où il se trouve actuellement\n
            !rand [element ...] -> Tire au sort un élément parmis ceux précisés en argument\n
            !twitch [channelName] -> Affiche un stream twitch dans le canal textuel\n
            !meteo [city] [demain?]-> Affiche la météo d'une ville française pour aujourd'hui ou demain si cela est précisé en second argument`);
    }
};