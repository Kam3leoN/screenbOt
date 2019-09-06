// Utilisation du mode strict
'use strict';

// Importation des modules nécessaires 
const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const config = require("./config.js");

// Création d'une class MyClient
/**
 * Framework Discord.js
 * @extends {AkairoClient}
 */
class MyClient extends AkairoClient {
    constructor() {
	/**
	* @typeof {Object} [Akairo options]
	* @typeof {Object} [Discord.js options]
	*/
        super({
            ownerID: '91279640252907520', // or ['91279640252907520', '363603951163015168']
        }, {
            disableEveryone: true
        });
		
		// CHARGEMENT DES COMMANDES
        this.commandHandler = new CommandHandler(this, {
		    directory: './src/commands/',
		    //automateCategories: true,
		    prefix: '!',
		    defaultCooldown: 1000,
		    ignoreCooldown: [],
		    allowMention: true,
		    handleEdits: true,
		    commandUtil: true,
		    aliasReplacement: /-/g,
		});

		// CHARGEMENT DES RESTRICTIONS
		this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './src/inhibitors/',
            //automateCategories: true,
        });

		// CHARGEMENT DES EVENEMMENTS
        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/',
            //automateCategories: true,
        });

        // INITALISATION DES CHARGEMENTS
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);

		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler,
		});

		this.commandHandler.loadAll();
		this.inhibitorHandler.loadAll();
		this.listenerHandler.loadAll();


    }
}

const client = new MyClient();
client.login(config.token);
