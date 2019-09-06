// --eval this.client.emit('guildMemberAdd', message.author);
// --eval message.author
const { Command } = require('discord-akairo');
const { MessageEmbed } = require("discord.js");
const hastebin = require('hastebin-gen');

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval', 'e'],
            args: [{ id: 'code', match: 'text' }],
            ownerOnly: true,
            prefix: '--',
        });
    }

    exec(message, args) {
        try {
            const code = args.code;
            const codeEvaled = eval(code);

            if (typeof code !== 'string') { 
                code = require('util').inspect(code, { depth: 0 }); 
            };

            const embed = new MessageEmbed()
                .setAuthor('Évaluation')
                .setColor('#111111')
                .addField(":inbox_tray: `REQUÊTE ÉVALUÉ`", '```js\n' + `${code}` + '```')
                .addField(":outbox_tray: `RÉSULTAT`", '```js\n' + `${codeEvaled}` + '```')
                .setFooter(`Commande excécuté par : ${message.author.username}`,`https://cdn.discordapp.com/attachments/611997398410985492/612053510770655233/screenbot.png`)
                .setTimestamp();

            if (code.length > 2000) {
                hastebin(code, "js").then(r => {
                    return message.channel.send(`La limite de caractères a été dépassée, j'ai donc placé le résultat dans un [lien Hastebin ...](${r}) :sweat_smile:`)
                });
            };
            message.delete();

            message.channel.send(embed);

        } catch (e) {
            message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
        }

    }
}

module.exports = EvalCommand;