const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");


module.exports = {
    name: "splitgate", 
    catergory: "info",
    description: "Tracks Splitgate stats",
    run: async (client, message, args) => {
        const platforms = ['steam' ]
        const platform = args[0]
        const playerID = message.toString().slice(message.toString().indexOf(args[1]), message.length);

        if(!platforms.includes(platform)) {
            return message.reply("Remember the user platform -> steam")
        }

        if(!args[1]) {
            return message.reply("Whose mans am I tracking🤔")
        }


        const url =  'https://public-api.tracker.gg/v2/splitgate/standard/profile/' + platform + '/' + playerID 
        request(url, {
            headers: {
                'TRN-Api-Key' : '17ec97eb-349d-47e2-8ebf-9c823db03514'
            }},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const response = JSON.parse(body)
                    
                    // Stats
                    const name = response['data']['platformInfo']['platformUserHandle']
                    const points = response['data']['segments'][0]['stats']['points']['displayValue']
                    const kills =   response['data']['segments'][0]['stats']['kills']['displayValue']
                    const assists = response['data']['segments'][0]['stats']['assists']['displayValue']
                    const deaths = response['data']['segments'][0]['stats']['deaths']['displayValue']
                    const damage = response['data']['segments'][0]['stats']['damageDealt']['displayValue']
                    const wins = response['data']['segments'][0]['stats']['wins']['displayValue']
                    const matchesPlayed = response['data']['segments'][0]['stats']['matchesPlayed']['displayValue']
                    const timePlayed = response['data']['segments'][0]['stats']['timePlayed']['displayValue']

                    const answer = new MessageEmbed()
                        .setColor("#B5D6C3")
                        .setThumbnail(response['data']['platformInfo']['avatarUrl'])
                        .setAuthor(`${name}`)
                        .setDescription(stripIndents`Matches Played: ${matchesPlayed}
                        Time Played: ${timePlayed}
                        Wins: ${wins}
                        Deaths: ${deaths}
                        Kills: ${kills}
                        Assists: ${assists}
                        Damage: ${damage}
                        Points: ${points}`)

                    message.channel.send(answer)
                }
            })
    }
}