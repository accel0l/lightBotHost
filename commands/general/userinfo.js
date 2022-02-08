let { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'userinfo',
    aliases: ['ui', 'user'],
    description: 'Show user\'s infos',
    async execute(client, message, args) {

        let user = message.mentions.members.first() || client.users.cache.get(args[0]) || message.member;
        if(!user) {
            const embedUserInvalid = new MessageEmbed().setTitle('Utente non valido').setColor('RED')
            return message.channel.send({embeds: [embedUserInvalid]})
        }
       
        try {
        let embed = new MessageEmbed()
        .setTitle(`${user.user.username}#${user.user.discriminator}`)
        .setColor('BLURPLE')
        .setThumbnail(user.user.displayAvatarURL())
        .addFields(
            {
                name: 'Avatar',
                value: `[Clicca qui](${user.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png'})})`,
                inline: true
            },
            {
                name: 'Ruoli',
                value: user.roles.cache.map((role) => role.toString()).join(' \n'),
                inline: true
            },
            {
                name: 'ID',
                value: `\`\`\`${user.user.id}\`\`\``,
                inline: false
            },
            {
                name: 'Attività:',
                value: `\`\`\`${user.presence.activities[0] ? user.presence.activities[0].name : 'Attività non rilevata'}\`\`\``,
                inline: false
            },
            {
                name: 'Creazione',
                value: `\`\`\`${user.user.createdAt.toLocaleDateString('en-us')}\`\`\``,
                inline: true,
            },
            {
                name: 'Entrato il: ',
				value: `\`\`\`${user.joinedAt.toLocaleDateString('en-us')}\`\`\``,
				inline: true,
            }
        )
        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL())

        message.delete({ timeout : 3000 })
        message.channel.send({ embeds : [embed] })   
        } catch (e) {
            let emoji = ['<a:bob:929707454122590279>', '<a:amongusrunnig:929707129881915483>', '<:isabelle_2:929707360702836776>']
            let oneemoji = emoji[Math.floor(Math.random() * emoji.length)]
            let embedFail = new MessageEmbed().setTitle(`Si è verificato un errore ${oneemoji}`).setColor('RED')
            message.channel.send({ embeds : [embedFail] })
        }      
    },
}
