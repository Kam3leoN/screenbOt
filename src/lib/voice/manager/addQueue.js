const { MessageCollector } = require('discord.js');

module.exports = async (client, message, args) => {
  try {
    const connection = client.connection;
    const queue = require('./getQueue')(client.queue, message.guild.id);
    var songs = await require('./../network')(args);
    if (songs.length < 1)
      return message.channel.send("je n'ai pas trouvé de musique");
    const description = songs
      .slice(0, 5)
      .map(
        (s, i) =>
          `[**${i + 1}**] ` +
          `[${s.snippet.title}](` +
          `https://www.youtube.com/watch?v=${s.id.videoId}` +
          `)`
      )
      .join('\n');
    message.channel
      .send("Veillez choisir une musique", {
        embed: {
          description,
          footer: {
            text: 'envoyer \`cancel\` pour annuler',
          },
        },
      })
      .then(m => {
        const filter = m => m.author.id === message.author.id;
        m.delete({ timeout: 25000 }).catch(e => { });
        const collector = new MessageCollector(message.channel, filter, {
          time: 20000,
        });
        collector.on('collect', msgCollected => {
          const choice = msgCollected.content.split(' ')[0];
          if (choice.toLowerCase() === 'cancel') {
            return collector.stop('STOPPED');
          }
          if (!choice || isNaN(choice)) {
            return message.channel.send(
              "Votre choix est invalide"
            );
          }
          if (choice > songs.length || choice <= 0) {
            return message.channel.send(
              "Votre choix n'est pas dans la selection"
            );
          }
          const song = songs[choice - 1];
          collector.stop('PLAY');
          var uriVideo = `https://www.youtube.com/watch?v=${song.id.videoId}`;
          m.delete();
          queue.push({
            track: song.id.videoId,
            author: message.author.tag,
            loop: false,
            info: {
              title: song.snippet.title,
              author: song.snippet.channelTitle,
              url: uriVideo,
              channelId: song.snippet.channelId,
              publishAt: song.snippet.publishAt,
              description: song.snippet.description,
              image: {
                default: song.snippet.thumbnails.default.url,
                medium: song.snippet.thumbnails.medium.url,
                high: song.snippet.thumbnails.high.url,
              },
            },
          });
          if (queue.length > 1)
          console.log(song);
            return message.channel.send(
              {
                embed: {
                  title: "Votre musique à été ajouté à la playlist",
                  thumbnail: {
                    url: song.snippet.thumbnails.default.url,
                  },
                  fields: [
                    {
                      name: 'title',
                      value: song.snippet.title,
                      inline: false,
                    },
                    {
                      name: 'author',
                      value: song.snippet.author,
                      inline: false,
                    },
                    {
                      name: 'publier le',
                      value: song.snippet.publishAt,
                      inline: false,
                    }
                  ]
                }
              }
            ).catch(console.error);
          return require('./../function/play')(client, message, connection);
        });
        collector.on('end', (collected, reason) => {
          if (reason === 'STOPPED') {
            return message.channel.send(
              "La selection à était stoppé"
            );
          } else if (reason === 'PLAY') {
            return false;
          } else {
            return message.channel.send(
              "Le délai à était dépassé"
            );
          }
        });
      });
  } catch (error) {
    console.error(false, error);
  }
}