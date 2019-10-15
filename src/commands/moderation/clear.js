const { Command } = require('discord-akairo');

class ClearCommand extends Command {
    constructor() {
        super('clear', {
           aliases: ['purge'],
           args: [
            {
              id: 'bulkDelete',
              type: 'number',
            }
           ],
           clientPermissions: ["MANAGE_MESSAGES"],
           userPermissions: ["MANAGE_MESSAGES"],
           channel: "guild",
        });
    }

    async exec(message, args) {
        message.delete();
        if (!args.bulkDelete || args.bulkDelete > 100 || args.bulkDelete < 1) return message.reply("Vous devez choisire une nombre entre 1 et 100 !");
        await message.channel.bulkDelete(args.bulkDelete).then(onfulfilled => {
            return message.channel.send(`${onfulfilled.size} à etait supprimé`);
        }).catch(onrejected => {
            require('./../../utils/error')(onrejected, message, client);
            return message.channel.send(`Une erreur est survenue`);
        });
        require('./../../utils/error')(new Error({
            message: 'La commande \"CLEAR\" à mal était executé pour cause le /return/ n\'as pas était éxecuté',
            type: '"return" not fonctionned'
        }));
    }
}

module.exports = BanCommand;