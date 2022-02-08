const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'invito',
    description: 'Give the server invite!',
    async execute(client, message, args) {

        const embed = new MessageEmbed()
        .setTitle('Invito!')
        .setDescription('Hey, se ti va puoi condividere questo link con i tuoi amici: <a:animalcrossing_dancing:927875087972052992> \nhttps://discord.gg/Etm6FfbmeD')
        .setTimestamp()
        .setColor('BLURPLE')

        message.reply({ embeds: [embed] })
    }
}