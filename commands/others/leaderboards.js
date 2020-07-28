const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const request = require("request");
const cheerio = require('cheerio');

module.exports = {
    name: "leaderboards", 
    catergory: "info",
    description: "Fortnite Events Leaderboards",
    run: async (client, message, args) => {
        const url =  'https://fortnitetracker.com/events/epicgames_S13_DailyTrios_NAW_PC'
        request(url,function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body)
                const table = $('.trn-site  trn-site--small-header');

                console.log(table.html())

                
            }
        })
    }
}