const { Command } = require('discord-akairo');
const { MessageEmbed } = require("discord.js");

class ServersCommand extends Command {
  constructor() {
    super('servers', {
      aliases: ['servers'],
      ownerOnly: true
    });
  }

  async exec(message) {
    message.delete()
    const serverCount = await this.client.guilds.size;
    const usersCount = await this.client.users.size;

    const embed = new MessageEmbed()
        .setColor("#0099FF")
        .setAuthor("CMD - SERVEURS ")
        .setThumbnail(this.client.user.displayAvatarURL())

        .addField("`JE SUIS PRÉSENT SUR`", '```autohotkey\n' + `${serverCount} SERVEURS` + '```')
        .addField("`ET UTILISÉ PAR`", '```autohotkey\n' + `${usersCount} UTILISATEURS` + '```')

        .setFooter(`Commande excécuté par : ${message.author.username}`,`https://cdn.discordapp.com/attachments/611997398410985492/612053510770655233/screenbot.png`)
        .setTimestamp();
    return message.util.send(embed);


  }
}

module.exports = ServersCommand;