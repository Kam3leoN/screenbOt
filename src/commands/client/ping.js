const { Command } = require('discord-akairo');
const { MessageEmbed } = require("discord.js");

class PingCommand extends Command {
    constructor() {
        super('ping', {
          aliases: ['ping','pong','pp','latence'],
          //prefix: ['.','?','/'],
          description: () => {
            return 'Renvoi le message **Pong !**';
          },
          cooldown: 30000,
          ratelimit: 2,
        });
    }

    async exec(message) {

      message.delete({ timeout: 1000 })
  
        const sent = await message.util.send("Pong !");
        const clientPing = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
        const latenceApi = Math.round(this.client.ws.ping)
        const ramUsed = Math.round(100 * (process.memoryUsage().heapUsed / 1048576)) / 100
        const ramTotal = Math.round(100 * (process.memoryUsage().heapTotal / 1048576)) / 100

        const embed = new MessageEmbed()
          .setColor("#0099FF")
          .setAuthor("CMD - PING")
          .setThumbnail(`https://cdn.discordapp.com/attachments/611997398410985492/611997547543789636/pingpong.png`)

          .addField("`PING EN M.SECONDES`", '```autohotkey\n' + `${clientPing} ms` + '```', true)
          .addField("`LATENCE API`", '```autohotkey\n' + `${latenceApi} ms` + '```', true)

          .addField("`MÉMOIRE RAM UTILISÉ`", '```autohotkey\n' + `${ramUsed} MB` + '```', true)
          .addField("`MÉMOIRE RAM TOTAL`", '```autohotkey\n' + `${ramTotal} MB` + '```', true)

          .setFooter(`Commande excécuté par : ${message.author.username}`,`https://cdn.discordapp.com/attachments/611997398410985492/612053510770655233/screenbot.png`)
          .setTimestamp();
        return message.util.send(embed);
    }
}

module.exports = PingCommand;