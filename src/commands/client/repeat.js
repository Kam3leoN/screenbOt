const { Command } = require('discord-akairo');

class RepeatCommand extends Command {
	constructor() {
		super('talk', {
			aliases: ['repeat'],
			description: 'Répète le texte.',
			ownerOnly: true,
			args: [
				{
					id: 'message',
					match: 'content'
				}
			]
		});
	}

	exec(msg, { message }) {
		msg.channel.send(message);
		msg.delete();
	}
}

module.exports = RepeatCommand;