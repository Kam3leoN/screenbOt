const { Command } = require('discord-akairo');
const { MessageEmbed } = require("discord.js");

class PlayCommand extends Command {
    constructor() {
        super('play', {
          aliases: ['p','j','jouer','play'],
          //prefix: ['.','?','/'],
          description: () => {
            return 'Joue de la musique';
          },
          args: [
            {
                id: 'title',
                match: 'content'
            }
          ],
          cooldown: 30000,
          ratelimit: 2,
        });
    }

    async exec(message, { title }) {
      message.delete({ timeout: 1000 })
      if (!message.guild) {
        return message.author.send("Vous pouvez pas utiliser cette commande en DM").catch(() => {});
      } else if (!message.member.voice.channel) {
        return message.channel.send("Vous devez vous connectez en premier");
      } else if (!message.member.voice.channel.joinable) {
        return message.channel.send(
          "Je n'est pas la permission de rejoindre"
        );
      } else if (!message.member.voice.channel.speakable) {
        return message.channel.send(
          "Je n'est pas la permission de parler"
        );
      }
      if (!message.guild.me.voice.channel || !this.client.connection) {
        this.client.connection = await message.member.voice.channel.join();
      }
      console.log(title);
      if (!title) return false;
      return require('./../../lib').play(this.client, message, title);
    }
}

module.exports = PlayCommand;