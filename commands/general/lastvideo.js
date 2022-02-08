const { MessageEmbed } = require('discord.js')
const ytch = require('yt-channel-info')

module.exports = {
    name: 'ultimovideo',
    description: 'Last video Of Lightning',
    async execute(client, message, args) {

        const channelId = 'UClWIZKtqbtsP9LhQj7CcwqQ' //Settare id del tuo canale YouTube
        const sortBy = 'newest'
        ytch.getChannelVideos(channelId, sortBy).then((response) => {

            var lastVideo = new MessageEmbed()
                .setTitle(response.items[0].title)
                .setColor('BLURPLE')
                .setURL("https://www.youtube.com/watch?v=" + response.items[0].videoId)
                .setThumbnail(response.items[0].videoThumbnails[3].url)
                .addFields(
                    {
                        name: 'Visualizzazioni',
                        value: `\`\`\`${response.items[0].viewCount.toString()}\`\`\``,
                        inline: true
                    },
                    {
                        name:'Durata',
                        value: `\`\`\`${response.items[0].durationText}\`\`\``,
                        inline: true
                    },
                    {
                        name: 'Pubblicazione',
                        value: `\`\`\`${response.items[0].publishedText}\`\`\``,
                        inline: true
                    }
                )
            message.channel.send({ embeds : [lastVideo] })
        })
    }
}