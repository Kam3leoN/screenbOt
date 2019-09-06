const { Command } = require('discord-akairo');
const { MessageEmbed } = require("discord.js");

class AboutCommand extends Command {
    constructor() {
        super('about', {
            aliases: ['about', 'bot', 'info'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['SEND_MESSAGES'],
            category: 'client',
            description: {
                content: 'Renvoi le à propos sur ScreenBot'
            },
            channel: 'guild'
        });
    }

    exec(message) {
        message.delete()
        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setAuthor("CMD - ABOUT")
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription([
"**Salut! Je m'appelle ScreenBot et je suis un bot de modération **! ",
"Vous pouvez en savoir plus sur moi ici :",
"https://github.com/Kam3leoN/ScreenBot",
"",
`Par défaut, le préfix auquel je réagis est : ** ! **`,
`Pour obtenir mon aide sur les commandes, écrivez **!help**.`,
            ])
            .setFooter(`Commande excécuté par : ${message.author.username}`,`https://cdn.discordapp.com/attachments/611997398410985492/612053510770655233/screenbot.png`)
            .setTimestamp();
        return message.channel.send(embed);
    };
}

module.exports = AboutCommand;