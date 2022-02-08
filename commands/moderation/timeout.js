const { MessageEmbed, Permissions } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'timeout',
    aliases: ['to', 'out'],
    description: 'Timeout a user!',
    async execute(client, message, args) {

        if (!message.member.permissions.has(Permissions.FLAGS.mute) || !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
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
            const embedUserInvalid = new MessageEmbed().setTitle('Utente non valido').setColor('RED')
            return message.channel.send({embeds: [embedUserInvalid]})
        }

        let time = args[1]
        if(!time) {
            const embedNoTime = new MessageEmbed().setTitle('Inserisci il timer!').setColor('RED')
            return message.channel.send({embeds: [embedNoTime]})
        }

        let reason = args[2]
        if(!reason) {
            reason = "NONE"
        }

        let parsedTime = ms(time)
        let embedUnableTime = new MessageEmbed().setTitle('Tempo non consentito!').setColor('RED')

        if( parsedTime < ms("1m")) {
            embedUnableTime.setDescription('Il timer deve essere **maggiore** di **1 minuto**')
            return message.reply({embeds: [embedUnableTime]})
        } 
        if(parsedTime > ms("28d")) {
            embedUnableTime.setDescription('Il timer deve essere **minore** di **28 giorni**')
            return message.reply({embeds: [embedUnableTime]})
        }

        const embed = new MessageEmbed()
        .setTitle('TIMEOUT')
        .setColor('BLURPLE')
        .setDescription(`<@${user.id}> è stato silenziato!`)
        .addFields(
            {
                name:'Tempo:',
                value: `\`\`\`${args[1]}\`\`\``,
                inline: true
            },
            {
                name: 'Moderatore:',
                value: `\`\`\`${message.author.tag}\`\`\``,
                inline: true
            }, 
            {
                name: 'Motivo:',
                value: `\`\`\`${reason}\`\`\``,
                inline: false
            }
        )

        await user.timeout(parsedTime, reason);

        message.delete()
        message.channel.send({embeds: [embed]})
    }
}