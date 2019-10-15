const { Command } = require('discord-akairo');

class BanCommand extends Command {
    constructor() {
        super('ban', {
           aliases: ['ban'],
           args: [
            {
              id: 'member',
              type: 'member',
            },
            {
                id: 'days',
                type: 'number'
            },
            {
                id: 'reason',
                type: 'string',
            },
           ],
           clientPermissions: ["BAN_MEMBERS"],
           userPermissions: ["BAN_MEMBERS"],
           channel: "guild",
        });
    }

    async exec(message, args) {
        message.delete();
        if (!args.member) return message.reply("Aucun membre n'a été trouvé !");
        if (!args.member.bannable) return message.reply('Je ne peut pas le ban !');
        await args.member.ban({ days: args.days ? args.days : 7, reason: args.reason ? args.reason : 'no reason' }).then(onfulfilled => {
            return message.channel.send(`${args.member} a été ban !`);
        }).catch(onrejected => {
            require('./../../utils/error')(onrejected, message, client);
            return message.channel.send(`Une erreur est survenue`);
        });
        require('./../../utils/error')(new Error({
            message: 'La commande \"BAN\" à mal était executé pour cause le /return/ n\'as pas était éxecuté',
            type: '"return" not fonctionned'
        }));
    }
}

module.exports = BanCommand;