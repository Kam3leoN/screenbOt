const { Command } = require('discord-akairo');

class KickCommand extends Command {
    constructor() {
        super('kick', {
           aliases: ['kick'],
           args: [
            {
              id: 'member',
              type: 'member',
            }
           ],
           clientPermissions: ["KICK_MEMBERS"],
           userPermissions: ["KICK_MEMBERS"],
           channel: "guild",
        });
    }

    async exec(message, args) {
        message.delete();
        if (!args.member) return message.reply("Aucun membre n'a été trouvé !");
        await args.member.kick();
        return message.channel.send(`${args.member} a été kick !`);
    }
}

module.exports = KickCommand;