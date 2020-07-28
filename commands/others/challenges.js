const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");


module.exports = {
    name: "challenges", 
    catergory: "others",
    description: "Displays fortnite challenges",
    run: async (client, message, args) => {
       
        url = 'https://api.fortnitetracker.com/v1/challenges'

        request(url, {
            headers: {
                'TRN-Api-Key' : '17ec97eb-349d-47e2-8ebf-9c823db03514'
            }},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const response = JSON.parse(body)
                    
                    // Challenges
                    const challenge1 = response['items'][0]['metadata'][1]['value']
                    const challenge2 = response['items'][1]['metadata'][1]['value']
                    const challenge3 = response['items'][2]['metadata'][1]['value']
                    const challenge4 = response['items'][3]['metadata'][1]['value']
                    const challenge5 = response['items'][4]['metadata'][1]['value']
                    const challenge6 = response['items'][5]['metadata'][1]['value']
                    const challenge7 = response['items'][6]['metadata'][1]['value']
                    
                    const answer = new MessageEmbed()
                        .setColor("#FFD700")
                        .setThumbnail(response['items'][0]['metadata'][4]['value'])
                        .setAuthor(`This Weeks's Fortnite Challenges`)
                        .setDescription(stripIndents`- ${challenge1}
                        - ${challenge2}
                        - ${challenge3}
                        - ${challenge4}
                        - ${challenge5}
                        - ${challenge6}
                        - ${challenge7}`)
                    
                    message.channel.send(answer)
                }
            })
    }
}
                    