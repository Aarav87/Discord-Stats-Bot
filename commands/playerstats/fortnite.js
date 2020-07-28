const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");


module.exports = {
    name: "fortnite", 
    catergory: "info",
    description: "Tracks Fortnite stats",
    run: async (client, message, args) => {
        const platforms = ['kbm', 'touchpad', 'gamepad']
        const platform  = args[0]
        const name = message.toString().slice(message.toString().indexOf(args[1]), message.length);

        if(!platforms.includes(platform)) {
            return message.reply("Remember the user platform -> kbm, touchpad or gamepad")
        }

        if(!args[1]) {
            return message.reply("Whose mans am I tracking🤔")
        }
        
        const url =  'https://api.fortnitetracker.com/v1/profile/' + platform + '/' + name
        request(url, {
            headers: {
                'TRN-Api-Key' : '17ec97eb-349d-47e2-8ebf-9c823db03514'
            }},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const response = JSON.parse(body)
                    
                    const epicName = response['epicUserHandle']
                    const kd = response['lifeTimeStats'][11]['value'] 
                    const wins = response['lifeTimeStats'][8]['value'] 
                    const kills =  response['lifeTimeStats'][10]['value'] 
                    const matches =  response['lifeTimeStats'][7]['value'] 
                    const winpercent = response['lifeTimeStats'][9]['value']
                    
                    const answer = new MessageEmbed()
                        .setColor("#8000ff")
                        .setThumbnail(response['avatar'])
                        .setAuthor(`${epicName}`)
                        .setDescription(stripIndents`Matches Played: ${matches}
                        Wins: ${wins}
                        Win%: ${winpercent}
                        Kills: ${kills}
                        KD: ${kd}`)
                    
                    message.channel.send(answer)
                }
            })
               
        
    }
}   