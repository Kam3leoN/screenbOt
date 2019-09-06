const { Command } = require('discord-akairo');
const { errorMessage, successMessage } = require('../../utils/alert');

class PurgeCommand extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge', 'prune', 'nettoie', 'efface'],
            args: [
                {
                    id: 'count',
                    type: 'integer'
                }
            ],
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            channelRestriction: 'guild'
        })
    }

    async exec(message, args) {
        const verdict = args.count + 1;

        if (verdict <= 1 || verdict > 100) {
            return errorMessage('Vous devez entrer un nombre de messages à supprimer compris entre 1 et 99.', message);
        }

        await message.channel.fetchMessages({
            limit: verdict
        }).then(messages => {
            message.channel.bulkDelete(messages, true);
            successMessage(`J'ai supprimés **${verdict}** messages à votre demande.`, message).then(msg => msg.delete(5000));
        });
    }
}

module.exports = PurgeCommand;