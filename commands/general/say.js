const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'say',
    description: 'Repeat a text',
    async execute(client, message, args) {

        if(!args[0]) {
            let embedNoArgs = new MessageEmbed()
            .setTitle('Inserisci un messaggio da ripetere!')
            .setColor('RED')
            return message.reply({ embeds: [embedNoArgs] })
        }

        let embed = new MessageEmbed()
        .setAuthor(`Say by ${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`\`\`\`${args[0]}\`\`\``)
        .setColor('BLURPLE')

        message.delete({ timeout : 3000 })
        message.channel.send({ embeds : [embed] })
    }
}