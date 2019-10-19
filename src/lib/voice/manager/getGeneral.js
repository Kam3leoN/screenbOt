module.exports = (client, guildID) => {
    var queues = client.GeneralVoice;
    if (!queues[guildID]) {
        queues[guildID] = { volume: client.volume, loopqueue: false };
    }
    return queues[guildID];
};