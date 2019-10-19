module.exports = (queues, guildID) => {
    if (!queues[guildID]) {
        queues[guildID] = [];
    }
    return queues[guildID];
};