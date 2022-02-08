const { MessageEmbed  } = require("discord.js")

module.exports = {
    name: `guildMemberAdd`,
    async execute(member) {

        member.roles.add('898947891824050216')
        let embed = new MessageEmbed()
        .setTitle('Benvenut-')
        .setDescription(`Ehy, **${member.user.username}** sembra che tu non sia ancora verificat*..
                    Per farlo, vai qui: <#898947347311099914> e digita:
                    > **!verifica** 
                    Miraccomando, **se vuoi che funzioni dovrai scriverlo allo stesso modo**!
                    Se invece **riscontri problemi** puoi **aprire** un **ticket** qui <#904760609663496212>.`)
        .setColor('DARK_RED')
        .setTimestamp()
        member.send({ embeds : [embed] })
    }
}