const { Listener } = require('discord-akairo');
const chalk = require("chalk");
const moment = require('moment');

class ReadyEvent extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        });
    }

    exec() {

    this.client.user.setStatus("online");
    this.client.user.setActivity("botter des culs");

console.log(`
===========================================================================
${chalk.hex('#0099ff')(`
███████  ██████ ██████  ███████ ███████ ███    ██ ██████   ██████  ████████
██      ██      ██   ██ ██      ██      ████   ██ ██   ██ ██    ██    ██   
███████ ██      ██████  █████   █████   ██ ██  ██ ██████  ██    ██    ██   
     ██ ██      ██   ██ ██      ██      ██  ██ ██ ██   ██ ██    ██    ██   
███████  ██████ ██   ██ ███████ ███████ ██   ████ ██████   ██████     ██   
`)}
=== INFORMATIONS CLIENT ===================================================
${chalk.hex('#ffcc00')(` ■ Bot Name`)}     : ${chalk.hex('#ffffff')(`${this.client.user.username}`)}
${chalk.hex('#ffcc00')(` ■ Bot ID`)}       : ${chalk.hex('#ffffff')(`${this.client.user.id}`)}
${chalk.hex('#ffcc00')(` ■ Bot Hashtag`)}  : ${chalk.hex('#ffffff')(`#${this.client.user.discriminator}`)}
${chalk.hex('#ffcc00')(` ■ Bot Créé le`)}  : ${chalk.hex('#ffffff')(`${moment(this.client.user.createdAt).format("DD/MM/YYYY à HH:mm")}`)}
${chalk.hex('#ffcc00')(` ■ Bot Version`)}  : ${chalk.hex('#ffffff')(`1.0.0a`)}
${chalk.hex('#ffcc00')(` ■ Bot Author`)}   : ${chalk.hex('#ffffff')(`Kam3leøN`)}
${chalk.hex('#ffcc00')(` ■ Bot Country`)}  : ${chalk.hex('#0033ff')(`█`)}${chalk.hex('#ffffff')(`█`)}${chalk.hex('#cc0000')(`█`)} ${chalk.hex('#ffffff')(`France`)}
===========================================================================
`);

    }
}

module.exports = ReadyEvent;