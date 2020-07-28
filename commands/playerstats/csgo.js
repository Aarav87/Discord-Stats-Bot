const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");


module.exports = {
    name: "csgo", 
    catergory: "info",
    description: "Tracks CSGO stats",
    run: async (client, message, args) => {
        const platforms = ['steam']
        const platform = args[0]
        const playerID = message.toString().slice(message.toString().indexOf(args[1]), message.length);

        if(!platforms.includes(platform)) {
            return message.reply("Remember the user platform -> steam")
        }

        if(!args[1]) {
            return message.reply("Whose mans am I tracking🤔")
        }


        const url =  'https://public-api.tracker.gg/v2/csgo/standard/profile/' + platform + '/' + playerID
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
                    const score = response['data']['segments'][0]['stats']['score']['displayValue']
                    const kills = response['data']['segments'][0]['stats']['kills']['displayValue']
                    const kd = response['data']['segments'][0]['stats']['kd']['displayValue']
                    const damage = response['data']['segments'][0]['stats']['damage']['displayValue']
                    const wins = response['data']['segments'][0]['stats']['wins']['displayValue']
                    const matchesPlayed = response['data']['segments'][0]['stats']['matchesPlayed']['displayValue']
                    const losses = response['data']['segments'][0]['stats']['losses']['displayValue']

                    const answer = new MessageEmbed()
                        .setColor("#8000ff")
                        .setThumbnail(response['data']['platformInfo']['avatarUrl'])
                        .setAuthor(`${name}`)
                        .setDescription(stripIndents`Matches Played: ${matchesPlayed}
                        Time Played: ${timePlayed}
                        Wins: ${wins}
                        Losses: ${losses}
                        Damage: ${damage}
                        Score: ${score}
                        KD: ${kd}`)
                    
                    message.channel.send(answer)
                }
            })
    }
}