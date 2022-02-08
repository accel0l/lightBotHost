const config = require('./config.json')
const {Collection, Client, MessageEmbed } = require('discord.js')
const fs = require('fs');

global.MongoClient = require('mongodb').MongoClient;
global.client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

global.database;
global.utentidb = '';

//COMMANDS
client.commands = new Collection();
const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

//ALIASES
client.aliases = new Collection();

//EVENTS
const eventsFolders = fs.readdirSync('./events');
for (const folder of eventsFolders) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of eventsFiles) {
        const event = require(`./events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on('messageCreate', message => {
    if(message.content == '!verifica') {
        if(!message.member.roles.cache.has("898947891824050216")) return
        if(message.guild.id != '764431250374787072') return
        if(message.member.roles.cache.has("898947891824050216")) {  
        const embedVerificato = new MessageEmbed()
        .setTitle('Verifica effettuata')
        .setDescription('<:fuffi:764474096263102495> Sei stato verificato correttamente, ti auguriamo una buona permanenza !')
        .setColor('GREEN')
        .setTimestamp() 

        message.channel.send('**Utente verificato!**')
        .then( msg => {
            setTimeout(() => msg.delete(), 10000)
        })
        message.member.roles.remove('898947891824050216')
        message.member.roles.add('869640783383384145')
        setTimeout(() => message.delete(), 10000)
        message.author.send({embeds: [embedVerificato]})

        let counter = client.channels.cache.get('837689728723189820');
        let general = client.channels.cache.get('764431255110287373');
        let messaggi = [
            `<:joined:901094765100142643> Fuffolino **${message.author.username}** entra nel server!`,
            `<:joined:901094765100142643> **${message.author.username}** è qui tra noi!!`,
            `<:joined:901094765100142643> **${message.author.username}** entra nel server! ||Speriamo che abbia delle stelline||`,
            `<:joined:901094765100142643> Date tutti il benvenuto a **${message.author.username}**`,
            `<:joined:901094765100142643> Appare un **${message.author.username}** selvatico ...`,
            `<:joined:901094765100142643> **${message.author.username}** è scivolato qui tra noi! `,
            `<:joined:901094765100142643> **${message.author.username}** si unisce alla festa!`
        ]
        let welcomer = messaggi[Math.floor(Math.random() * messaggi.length)];

        let server = message.member.guild;
        let bot = server.members.cache.filter( member => member.user.bot ).size;
        let members = server.memberCount - bot;

        general.send(`${welcomer}`)
        message.author.send(`Ciao Fuffolino **${message.author.username}**, benvenuto in **${message.guild.name}**
Hai appena completato la verifica e ora hai pieno accesso alle chat del server! <a:animalcrossing_dancing:927875087972052992>;
Prima però, consulta le regole: <#764467766114648084>
*Divertiti* :call_me: `)

        counter.setName(`𝓤𝓽𝓮𝓷𝓽𝓲 ► ${members}`)
    }}
})

client.login(config.token)