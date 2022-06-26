var fs = require('fs');
var path = require('path');
var request = require('request');
var discord = require('discord.js');
var client = new discord.Client({ intents : ["GUILDS", "GUILD_MESSAGES"] });
var express = require('express');
var app = express();
var router = express.Router();
//Web server
app.listen(4001, () => {
  console.log('Server started!');
});
app.get('/image.jpg', (req, res) => {
  res.sendFile(path.join(__dirname,"image","screenshot.jpg"));
});
app.get('/', (req, res) => {
  console.log(req.url);
  res.send('Home');
}); 
app.get('*', (req, res) => {
  res.send('404!');
});
//Bot online
client.on('ready', () => {
  console.log(`${client.user.username} is ready!`);
});
//Message
client.on('messageCreate', message => {
  if(message.content.startsWith('/screen')){
    var link = message.content.split('/screen')[1];
    shot(link);
    message.reply('Please wait 10 second!');
    setTimeout(function() {
    let embed = new discord.MessageEmbed()
    .setTitle("Website screenshot!")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setImage('https://ittuk.herokuapp.com/image.jpg')
    .setDescription(`${link}`)
    .setTimestamp()
    .setColor('RANDOM')
    message.channel.send({ embeds:[embed] });
    }, 10000);
  }
function shot(link) {
console.log('Uploaded : '+link);
var url = encodeURIComponent(link);
var token = 'R1D2N71-NFEM6VF-K0HCF3K-SA6AQPC';
var width = 1920;
var height = 1080;
var output = 'image';

// Construct the query params and URL
var query = "https://shot.screenshotapi.net/screenshot";
query += `?token=${token}&url=${url}&width=${width}&height=${height}&output=${output}`;
// Call the API and save the screenshot
request.get({url: query, encoding: 'binary'}, (err, response, body) => {
    fs.writeFile(`image/screenshot.jpg`, body, 'binary', err => {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
});
return url;
}
});
client.login('OTc2MzQxMDI3MzY1NDY2MTEy.GSHg-o.9HDd75tay44_f3uPzZhBCnFE4nmt-tKfz9DTPU');
