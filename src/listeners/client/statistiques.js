const { Listener } = require('discord-akairo');

class StatistiquesEvent extends Listener {
    constructor() {
        super('statistiques', {
            emitter: 'client',
            event: 'statistiques',
            category: 'client'
        });
    }

    async exec(client) {



	

	



	}
}

module.exports = StatistiquesEvent;