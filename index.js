const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS']});
var prefix = '+';


const fs = require('fs');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}


bot.once('ready', ()=> {
    console.log("Bot is online!");
});

bot.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'greet'){
        message.delete();
        bot.commands.get('hello').execute(message, args);

    } else if(command == 'shutdown') {
        bot.commands.get('shutdown').execute(message,args,bot);

    } 
});

bot.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == 'avatar') {
        bot.commands.get('avatar').execute(message,args,bot);
    } else if(command == 'banner') {
        bot.commands.get('banner').execute(message,args,bot);
    }

});




bot.login(process.env.DJS_TOKEN);