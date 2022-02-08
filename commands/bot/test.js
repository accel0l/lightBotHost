const { MessageEmbed } = require("discord.js")
const ms = require('ms')
const moment = require('moment')

module.exports = {
    name: 'test',
    description: 'Test if the bot work!',
    async execute(client, message, args) {

        message.react('<:tik:880125184382746695>')

        const embed = new MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
        .setColor('DARK_VIVID_PINK')
        .addFields(
            {
                name: 'Uptime',
                value: `\`\`\`${ms(client.uptime, { long: true })} - ${moment(new Date().getTime() - client.uptime).format("ddd DD MMM, HH:mm:ss")}\`\`\``,
                inline: true

            },
            {
                name: 'Ping',
                value: `\`\`\`${client.ws.ping} ms\`\`\``,
                inline: true
            }
        )
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}