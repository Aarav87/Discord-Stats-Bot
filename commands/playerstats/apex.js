const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");

module.exports = {
    name: "apex", 
    catergory: "info",
    description: "Tracks Apex Legends stats",
    run: async (client, message, args) => {
        const platforms = {
            'pc': '5', 
            'xbox': '1', 
            'psn': '2'
        }
        const platform  = args[0]
        const name = message.toString().slice(message.toString().indexOf(args[1]), message.length);

        if(!Object.keys(platforms).includes(platform)) { 
            return message.reply("Remember the user platform -> pc, xbox or psn")
        }

        if(!args[1]) {
            return message.reply("Whose mans am I tracking🤔")
        }
        
        
        const url =  'https://public-api.tracker.gg/apex/v1/standard/profile/' + platforms[platform] + '/' + name

        request(url, {
            headers: {
                'TRN-Api-Key' : '17ec97eb-349d-47e2-8ebf-9c823db03514'
            }},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const response = JSON.parse(body)
                   
                    // Stats
                    const name = response['data']['metadata']['platformUserHandle']
                    const level = response['data']['stats'][0]['value']
                    const rank = response['data']['metadata']['rankName']
                    const kills = response['data']['stats'][1]['value']
                    const damage = response['data']['stats'][2]['value']

                    
                    const answer = new MessageEmbed()
                        .setColor("#0bda51")
                        .setThumbnail(response['data']['metadata']['avatarUrl'])
                        .setAuthor(`${name}`)
                        .setDescription(stripIndents`Rank: ${rank}
                        Kills: ${kills}
                        Damage: ${damage}
                        Level: ${level}`)
                    
                    message.channel.send(answer)
                }
            })
               
        
    }
}   