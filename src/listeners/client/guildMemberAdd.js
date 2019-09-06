const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd',
            category: 'client'
        });
    }

    async exec(member) {
        const channelLogsBots = '610468446886428720'; // channel : logs bots

        const Canvas = require('canvas')
        const canvas = Canvas.createCanvas(800, 300)
        const ctx = canvas.getContext('2d')
        Canvas.registerFont('./assets/fonts/imagine.ttf', { family: 'imagine' })

            // BG FANART
            ctx.drawImage(await Canvas.loadImage('./assets/canvas/welcome/fanart.png'), 0, 0, 800, 300);

            // BG BACKGROUND
            ctx.drawImage(await Canvas.loadImage('./assets/canvas/welcome/background.png'), 0, 0, 800, 300);    

            // AVATAR
            // ctx.beginPath();
            // ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            // ctx.closePath();
            // ctx.clip();
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format:'png'},175));
            ctx.drawImage(avatar, 35, 90, 175, 175);
            
            // BG OVERLAY
            ctx.drawImage(await Canvas.loadImage('./assets/canvas/welcome/overlay.png'), 0, 0, 800, 300);
            
            // PSEUDO
            ctx.font = '60px Impact';
            ctx.fillStyle = '#eeeeee';
            ctx.fillText(`${member.user.username}`, 230, 160);

            // TAGS
            ctx.font = '34px Impact';
            ctx.fillStyle = '#ffcc00';
            ctx.fillText(`${member.user.discriminator}`, 250, 200);

            // TAGS
            ctx.font = '20px imagine';
            ctx.fillStyle = '#eeeeee';
            ctx.fillText(`TU ES LE ${member.user.discriminator}ème MEMBRES`, 250, 240);

            // IMAGE ENVOYER SUR DISCORD
            this.client.channels.get(channelLogsBots).send({
              files: [{
                attachment: canvas.toBuffer(),
                name: "welcome.png"
              }]
            });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BOUCLE : TOTAL MEMBRES
this.client.channels.get("611192739224223860").setName(`Membres : ${member.guild.memberCount}`); // channel : statistiques total membres

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
}

module.exports = GuildMemberAddListener;