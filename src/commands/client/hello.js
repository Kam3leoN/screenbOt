const { Command } = require('discord-akairo');

class HelloCommand extends Command {
    constructor() {
        super('hello', {
          aliases: ['bonjour', 'hello', 'konnichiwa', 'salut'],
          description: () => {
            return 'Renvoi une réponse adapté à la salutation';
          },
          //prefix: ['.','?','/'],
          //cooldown: 30000,
          //ratelimit: 2,
        });
    }

    exec(message) {
      if (message.util.parsed.alias === "hello") return message.util.send("Hello ;)");
      if (message.util.parsed.alias === "konnichiwa") return message.util.send("こんにちは ;)");
      if (message.util.parsed.alias === "salut") return message.util.send("Hey ! Salut toi ;)");
      return message.util.send('Bonjour ;)');	
    }
}

module.exports = HelloCommand;