const { MessageEmbed, CategoryChannel } = require("discord.js")
const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    description: 'Send Info of the server',
    async execute(client, message, args) {

        let server = message.member.guild;

        let bot = server.members.cache.filter( member => member.user.bot ).size;
        let members = server.memberCount - bot;

        let categoryCount = server.channels.cache.filter(c => c.type == "GUILD_CATEGORY").size;
        let textCount = server.channels.cache.filter(c => c.type == "GUILD_TEXT").size;
        let vocalCount = server.channels.cache.filter(c => c.type == "GUILD_VOICE").size;

        let boost = server.premiumTier;
        if(boost == 'NONE') {
            boost = '0';
        }

        const embed = new MessageEmbed()
        .setAuthor(`${server.name}`)
        .setThumbnail(server.iconURL())
        .setColor('BLURPLE')
        .addFields(
            {
                name: '<:KingsCrown:881182552449228820> Owner',
                value: `\`\`\`${client.users.cache.get(message.guild.ownerId).tag}\`\`\``,
                inline: true
            },
            {
                name: '📟 Server ID',
                value: `\`\`\`${server.id}\`\`\``,
                inline: true
            },
            {
                name: '<:users_logo:881184253549887528> Membri',
                value: `\`\`\`Umani: ${members} | Bot: ${bot}\`\`\``,
                inline: false
            },
            {
                name: '<:discord_channels_from_VEGA:881184781096857630> Canali',
                value: `\`\`\`Categorie: ${categoryCount} | Testuali: ${textCount} | Vocali: ${vocalCount}\`\`\``,
                inline: false
            },
            {
                name: '🕰️ Creazione',
                value: `\`\`\`${moment(server.createdAt).format("ddd DD MMM YYYY, HH:mm")} - ${moment(server.createdAt).fromNow()}\`\`\``,
                inline: false
            },
            {
                name: '<a:nitro_boost:881185756469686342> Boost',
                value: `\`\`\`Livello ${boost} - (Boost: ${server.premiumSubscriptionCount})\`\`\``,
                inline: true
            }
        )
        message.channel.send({embeds : [embed] })
            .catch(() => { })
    }
}