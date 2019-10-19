var indexOfSong = 0;
module.exports = async (client, message) => {
  const queue = require('./../manager/getQueue')(client.queue, message.guild.id);
  const queueG = require('./../manager/getGeneral')(client, message.guild.id);
  if (queueG.loopqueue === true) var lengthSong = queue.length;
  else return (indexOfSong = 0);
  if (lengthSong < indexOfSong) await (indexOfSong++ - 1);
  else return (indexOfSong = 0);
};