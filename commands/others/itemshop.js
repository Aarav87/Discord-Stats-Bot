const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");
const resizer = require('node-image-resizer');
const wget = require('node-wget');
var resizePngBuffer = require('resize-png-buffer')
var fs = require('fs')
const Jimp = require("jimp")
const path = require('path');

const setup = { 
  all: {
    path: 'C:/Users/aarav/Documents/StatsBot/',
    quality: 80
  },
  versions: [{
    prefix: 'medium_',
    width: 200,
    height: 256
  }]
};
 

module.exports = {
    name: "itemshop", 
    catergory: "others",
    description: "Displays fortnite item shop",
    run: async (client, message, args) => {
        
        url = 'https://api.fortnitetracker.com/v1/store'

        request(url, {
            headers: {
                'TRN-Api-Key' : '17ec97eb-349d-47e2-8ebf-9c823db03514'
            }},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const response = JSON.parse(body)
                    
                    const images = [
                        response[1]['imageUrl'],
                        response[2]['imageUrl'],
                        response[3]['imageUrl'],
                        response[4]['imageUrl'],
                        response[5]['imageUrl'],
                        response[6]['imageUrl'],
                        response[7]['imageUrl'],
                        response[8]['imageUrl'],
                        response[9]['imageUrl'],
                        response[10]['imageUrl'],
                        response[11]['imageUrl']
                    ]

                    for(var i = 0; i < images.length; i++) {
                        answer = new MessageEmbed()
                            .setImage(images[i])
                        

                        message.channel.send(answer)
                        
                    }
                }
            })

    }
}
        
