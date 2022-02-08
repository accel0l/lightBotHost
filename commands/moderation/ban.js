const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name: 'ban',
    description: 'Ban a user!',
    onlyStaff: true,
    async execute(client, message, args) {

        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) || !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            const noPerm = new MessageEmbed().setTitle('Non hai il permesso!').setColor('RED')
            return message.channel.send({ embeds : [noPerm] })
        }

        if(!args[0]) {
            const embedNoUser = new MessageEmbed().setTitle('Inserisci un utente!').setColor('RED')
            return message.channel.send({embeds: [embedNoUser]})
        }

        var user = message.mentions.members.first()
        if(!user) {
            user = message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(user => user.user.username.toLowerCase() == args[0]) || message.guild.members.cache.find(user => user.user.tag.toLowerCase() == args[0]) || message.guild.members.cache.find(user => user.nickname && user.nickname.toLowerCase() == args[0])
        }

        if(!user) {
            const embedUserInvalid = new MessageEmbed().setTitle('Utente non valido')
            return message.channel.send({embeds: [embedUserInvalid]})
        }

        let reason = args[1]
        if(!reason) {
            reason = "NONE"
        }

        const banFrasi = [
            "è stato bannato!",
            "doveva essere cacciato",
            "non si comportava bene",
            "non era un ottimo membro..",
            "è stato allontanato con la forza!"
        ]

        const frase = banFrasi[Math.floor(Math.random() * banFrasi.length)];

        if(user) {
            const embed = new MessageEmbed()
            .setTitle('Ban')
            .setDescription(`<@${user.id}> ${frase}`)
            .setColor('BLURPLE')
            .addFields(
                {
                    name: 'Motivo:', // - `\`\`\` \`\`\``
                    value: `\`\`\`${reason}\`\`\``,
                    inline: true
                },
                {
                    name: 'Moderatore:',
                    value: `\`\`\`${message.author.tag}\`\`\``,
                    inline: true
                }
            )
            .setTimestamp()

            message.channel.send({embeds : [embed]})

            const embedForBanned = embed.setDescription('Sei stato bannato!').setTitle(`${message.guild.name}`)
            user.send({embeds: [embedForBanned]})
            .catch(console.log)

            message.delete()
            user.ban({ reason: reason })
        }
    }
}