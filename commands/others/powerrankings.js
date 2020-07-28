const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");


module.exports = {
    name: "powerrankings", 
    catergory: "info",
    description: "Fortnite Power Rankings",
    run: async (client, message, args) => {
        const platforms = ['pc', 'console', 'mobile']
        const regions = ['NAE', 'NAW', 'EU']
        const platform  = args[0]
        const region = args[1]
        const name = message.toString().slice(message.toString().indexOf(args[2]), message.length);

        if(!platforms.includes(platform)) {
            return message.reply("Remember the user platform -> pc, console or mobile")
        }

        if(!regions.includes(region)) {
            return message.reply("What region??")
        }

        if(!args[2]) {
            return message.reply("Whose mans am I tracking🤔")
        }
        
        const url =  'https://api.fortnitetracker.com/v1/powerrankings/' + platform + '/' + region + '/' + name
        request(url, {
            headers: {
                'TRN-Api-Key' : '17ec97eb-349d-47e2-8ebf-9c823db03514'
            }},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const response = JSON.parse(body)
                    
                    // Stats
                    const name = response['name']
                    const points = response['points']
                    const cashPrize = response['cashPrize']
                    const events = response['events']
                    const rank = response['rank']

                    const answer = new MessageEmbed()
                        .setColor("#FF6A95")
                        .setThumbnail("https://www.pngitem.com/pimgs/m/339-3393710_cartoon-trophy-hd-png-download.png")
                        .setAuthor(name)
                        .setDescription(stripIndents`Rank: ${rank}
                        Events: ${events}
                        Cash Prize: ${cashPrize}
                        Points: ${points}`)

                    message.channel.send(answer)
                }
            })
               
        
    }
}   