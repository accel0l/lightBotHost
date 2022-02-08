const ytch = require('yt-channel-info')

module.exports = {
    name: `ready`,
    async execute() {

        setInterval(() => {
            let activities = [
                '!help',
                'Nuova Versione!',
                'Version 2.0',
                'Aiutando i Fuffolini!',
                'Controllando la chat..',
                'Rubando le stelline a Tom Nook'
            ]
            let activity = activities[Math.floor(Math.random() * activities.length)]
            client.user.setActivity(`${activity}`, { type: 'COMPETING' });
        }, 1000 * 15);
        console.log(`${client.user.tag} now online!`)

        
        let id = 'UClWIZKtqbtsP9LhQj7CcwqQ'
        let YouTubeChannel = client.channels.cache.get('813373165563805696')
        let emojis= [ 
            '<a:ohno:821307647486984203>',
            '<:fuffi:764474096263102495>',
            '<:eheh:808071668571701259>',
            '<a:animalcrossing_dancing:927875087972052992>',
            '<:isabelle_2:929707360702836776>',
            '<a:bob:929707454122590279>',
            '<:Panda_dab:901475771665768529>',
            '<a:amongusrunning:929707129881915483>'
        ]
        let emoji = emojis[Math.floor(Math.random() * emojis.length)]

        setInterval(function () {
            ytch.getChannelInfo(id).then((response) => {
                client.channels.cache.get("923344642324443176").setName(`𝓘𝓼𝓬𝓻𝓲𝓽𝓽𝓲 ► ${response.subscriberCount}`, 'Aggiornamento iscritti.')
            })
        }, 1000 * 60 )

        setInterval(() => {
            ytch.getChannelVideos(id, "newest").then(async response => {
                var idVideo = response.items[0]?.videoId
                if (!idVideo) return
        
                YouTubeChannel.messages.fetch()
                    .then(messages => {
                        var giaMandato = false;
                        messages.forEach(msg => {
                            if (msg.content.includes(idVideo)) giaMandato = true;
                        });
        
                        if (!giaMandato) {
                            YouTubeChannel.send(`<:YouTube:880116599816871987> **NUOVO VIDEO** <:YouTube:880116599816871987>

                            > ${emoji} Corri a vedere **${response.items[0].author}** su Youtube!
                            > <:arrowred:933737651855573054> __**${response.items[0].title}**__
                            > <:Link_Red:933734106364252185> __**https://www.youtu.be/${videoID}**__
                            
                            Ping: <@&933721026305613865>`)
                            client.channels.cache.get('813785650653298728').send(`Il video:
                            > <:arrowred:933737651855573054> __**https://www.youtu.be/${videoID}**__ è stato inviato!`) //Importate non levare l'id del video
                        }
                    })
            })
        }, 1000 * 30)
    }
}