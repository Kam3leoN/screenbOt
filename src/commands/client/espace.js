const { Command } = require('discord-akairo');

class EspaceCommand extends Command {
    constructor() {
        super('espace', {
           aliases: ['espace'],
           ownerOnly: true, //seulement admin
           channel: "guild",
        });
    }

    exec(message) {
      message.delete();

      const channel = message.mentions.channels.first() || message.channel;
      channel.setName((channel.name).replace(/-/g, "\u2009\u2009")).then(() => message.reply("Le salon à été renommé avec succès !"));
    }
}

module.exports = EspaceCommand;