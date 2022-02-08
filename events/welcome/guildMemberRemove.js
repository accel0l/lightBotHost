const { execute } = require("../../commands/moderation/verifica");

module.exports = {
    name: `guildMemberRemove`,
    async execute(member) {

        let server = member.guild;
        let bot = server.members.cache.filter( member => member.user.bot ).size;
        let members = server.memberCount - bot;
        let counter = client.channels.cache.get('837689728723189820'); 

        counter.setName(`𝓤𝓽𝓮𝓷𝓽𝓲 ► ${members}'`, 'Uscita di un membro')
    }
}
