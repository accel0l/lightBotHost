const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name: 'clear',
    async execute(client, message, args) {

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            const noPerm = new MessageEmbed().setTitle('Non hai il permesso!').setColor('RED')
            return message.channel.send({ embeds : [noPerm] })
        }

        let count = args[0]
        if(!count) {
            let noCount = new MessageEmbed().setTitle('Inserisci i messaggi!').setColor('RED') 
            return message.channel.send({ embeds : [noCount]})
        } else {
            count = parseInt(count) + 1
        }

        let reason = args[1]
        if(!reason) {
            reason = 'NONE'
        }
        try { 
        message.channel.bulkDelete(count, reason, true)
        let embed = new MessageEmbed()
        .addFields(
            {
                name: '<a:Tick:933779834746839060> Messaggi Eliminati:',
                value: `\`\`\`${count - 1}\`\`\``,
                inline: true
            }
        )
        .setColor('BLURPLE')

        if(reason) {
            embed.addField('<:Scales:933785321068453939> Reason:', `\`\`\`${reason}\`\`\``, true)
        }

        message.reply({ embeds : [embed] })
        .then( msg => {
            setTimeout(() => msg.delete(), 10000)
        })
        } catch (e) {
            console.log('C\'è stato un errore :\\')
        }
    }
}