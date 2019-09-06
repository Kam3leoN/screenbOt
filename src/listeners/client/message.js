const { Listener } = require('discord-akairo');

class MessageEvent extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message',
            category: 'client'
        });
    }

    exec(message) {

    	// Ignore les messages différent d'un type textuel
	    if (message.channel.type != 'text') return;

	    // Ignore les messages privés
	    if (message.channel.type == "dm") return;

	    // Ignore les message des bots
	    if (message.author.bot) return;
        if (message.author.bot || !message.guild) return;

    }
}

module.exports = MessageEvent;