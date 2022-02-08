const { MessageEmbed, Permissions } = require('discord.js');
const { inspect } = require('util')
 
module.exports = {
    name: 'eval',
    description: 'evaluates any string as javascript code and executes it.',
    onlyStaff: true,
    cooldown: 1,
    async execute(client, message, args) {

        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) || !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            const noPerm = new MessageEmbed().setTitle('Non hai il permesso!').setColor('RED')
            return message.channel.send({ embeds : [noPerm] })
        }
        
        const command = args.join(" ");
        if(!command) {
            let noEval = new MessageEmbed()
            .setTitle('Scrivi un comando eval!')
            .setColor('RED')
            return message.channel.send({ embeds : [noEval] })
        } 

        try {
            const evaled = eval(command)
            let words = ["token", "destroy"]
            if(words.some(word => message.content.toLowerCase().includes(word))){
                const embed = new MessageEmbed()
                .setTitle('Impossibile eseguire il comando')
                .setDescription('**Motivo:** Il comando potrebbe uccidermi!')
                .setColor('RED')
                return message.channel.send({embeds : [embed] })
            }
            const embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Risultato:')
            .addField(`**Tipo:**`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
            .addField("**Tempo di esecuzione:**", `\`\`\`yaml\n${Date.now()-message.createdTimestamp} ms\`\`\``, true)
            .addField("**Entrata**", `\`\`\`js\n${command}\`\`\``)
            .addField("**Uscita**", `\`\`\`js\n${inspect(evaled, {depth: 0})} \`\`\``)

            if(embed[0].fields[3].value > 1024 ) {
                let embed1024 = new MessageEmbed().setTitle('Il contenuto del messaggio supera i 1024 carattaeri').setColor('DARK_RED')
                return message.channel.send({ embeds : [embed] })
            }
            message.channel.send({ embeds: [embed] })

        }
        catch (error) {
            const embedfailure = new MessageEmbed()
            .setColor("RED")
            .addField(`Entrance`, `\`\`\`js\n${command}\`\`\``)
            .addField(`Error`, `\`\`\`js\n${error}\`\`\` `)

            message.channel.send({ embeds: [embedfailure] })
        }
    }}