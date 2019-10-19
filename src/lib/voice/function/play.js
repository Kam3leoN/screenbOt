const ytdl = require('ytdl-core');

module.exports = async (client, message) => {
    try {
        const queue = await require('./../manager/getQueue')(client.queue, message.guild.id);
        const queueG = await require('./../manager/getGeneral')(client, message.guild.id);
        const i = await require('./checker')(client, message);
        const connection = client.connection;
        if (queue.length === 0) {
            return;
        }
        const currentTrack = queue[i];
        message.channel.send(
            `Je joue **${currentTrack.info.title} - ${currentTrack.info.author}**`
        );
        client.dispatcher = await connection.play(
            await ytdl(currentTrack.info.url, {
                quality: 'highestaudio',
                audioonly: true,
                filter: format => format.container === 'mp4',
                lang: 'fr',
                begin: '00:00:00.000',
            }),
            {
                type: 'unknown',
                volume: queueG.volume,
                seek: 0,
                bitrate: 320000,
                highWaterMark: 25,
                fec: true,
            }
        );
        client.dispatcher.on('error', e => {
            console.log(e);
        });
        client.dispatcher.on('finish', () => {
            if (!currentTrack.loop && !queueG.loopqueue) {
                queue.shift();
            }
            if (queue.length === 0) {
                message.channel.send("La queue est vide");
            }
        this(client, message);
        });
    } catch (error) {
        console.error(error);
    }
}