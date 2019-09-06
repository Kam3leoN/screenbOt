const { MessageEmbed } = require("discord.js");

module.exports.errorMessage = (error, message) => {
    const errorEmbed = new MessageEmbed()
        .setColor("#cc0000")
        .setDescription(`**\`❌\`** - ${error}`);

    return message.channel.send(errorEmbed);
};

module.exports.warnMessage = (warning, message) => {
    const warnEmbed = new MessageEmbed()
        .setColor("#ff9900")
        .setDescription(`**\`⚠\`** - ${warning}`);

    return message.channel.send(warnEmbed);
};

module.exports.successMessage = (content, message) => {
    const successEmbed = new MessageEmbed()
        .setColor("#33cc00")
        .setDescription(`**\`✔\`** - ${content}`);

    return message.channel.send(successEmbed);
};