const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");


module.exports = {
    name: "division2", 
    catergory: "info",
    description: "Tracks Ubisoft's Division2 stats",
    run: async (client, message, args) => {
        const platforms = ['uplay', 'xbl', 'psn']
        const platform  = args[0]
        const name = message.toString().slice(message.toString().indexOf(args[1]), message.length);

        if(!platforms.includes(platform)) {
            return message.reply("Remember the user platform -> uplay, xbl or psn")
        }

        if(!args[1]) {
            return message.reply("Whose mans am I tracking🤔")
        }
        
        const url =  'https://public-api.tracker.gg/v2/division-2/standard/profile/' + platform + '/' + name
        request(url, {
            headers: {
                'TRN-Api-Key' : '17ec97eb-349d-47e2-8ebf-9c823db03514'
            }},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const response = JSON.parse(body)
                    
                    // Stats
                    const name = response['data']['platformInfo']['platformUserHandle']
                    const timePlayed = response['data']['segments'][0]['stats']['timePlayed']['displayValue']
                    const kills = response['data']['segments'][0]['stats']['playersKilled']['displayValue']
                    const headshots = response['data']['segments'][0]['stats']['headshots']['displayValue']
                    const xp = response['data']['segments'][0]['stats']['xPTotal']['displayValue']
                    const specialization = response['data']['segments'][0]['stats']['specialization']['displayValue']
                    const level = response['data']['segments'][0]['stats']['highestPlayerLevel']['displayValue']

                    
                    const answer = new MessageEmbed()
                        .setColor("#48bf91")
                        .setThumbnail(response['data']['platformInfo']['avatarUrl'])
                        .setAuthor(`${name}`)
                        .setDescription(stripIndents`Time Played: ${timePlayed}
                        Kills: ${kills}
                        Headshots: ${headshots}
                        Specialization: ${specialization}
                        Level: ${level}
                        XP: ${xp}`)
                        
                    
                    message.channel.send(answer)
                }
            })
               
        
    }
}   