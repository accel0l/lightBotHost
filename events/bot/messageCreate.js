const config = require('../../config.json')

module.exports = {
    name: "messageCreate",
    async execute(message) {

    if(message.channel.type == "dm") return message.user.send('**Per favore prova ad usarmi in un canale del server!*')
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;

    let command = client.commands.get(cmd)
    if(command) command.execute(client, message, args)
}}