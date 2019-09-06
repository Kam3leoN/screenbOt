const { Command } = require('discord-akairo');
const { MessageEmbed } = require("discord.js");

module.exports = class UpdatesCommand extends Command {
	constructor() {
		super('updates', {
			aliases: ['updates'],
			usage: 'updates',
			description: 'Shows you the newest updates.'
		});
	}

    async exec(message) {
        
        message.delete()

        const embed = new MessageEmbed()
            .setColor("#66cc00") // Ajout : #66cc00 | Retrait : #cc0000 | Fix : #ffcc00
            .setAuthor("Mise à jour")

            .addField("`NOUVELLE COMMANDE`", '```\n' + `REPEAT.JS` + '```', true)
            .addField("`DETAILS`", '```\n' + `permet de répéter une phrase par le biais du bot.` + '```', true)
            .addField("`UTILISATION`", '```\n' + `[prefix]repeat [texte]` + '```', true)
  
            .setFooter(`Notification de mise à jour`,`https://cdn.discordapp.com/attachments/611997398410985492/612053510770655233/screenbot.png`)
            .setTimestamp();
          return message.channel.send(embed);
      }
};