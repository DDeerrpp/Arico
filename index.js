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


bot.on('ready', ()=> {
    console.log("Bot is online!");
    var guildID = '781351659233869885';
    var guild = bot.guilds.cache.get(guildID);
    let commands;
    if(guild) {
        commands = guild.commands;
    } else {
        commands = bot.application?.commands;
    }


    commands?.create({
        name: 'ping',
        description: 'replies with pong'
    })

    commands?.create({
        name: 'rollnumber',
        description: 'rolls a random number',
        options: [
            {
                name: 'minimum',
                description: 'minimum',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.INTEGER
            },
            {
                name: 'maximum',
                description: 'maximum',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.INTEGER
            }
        ]
    })
});

bot.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'greet'){
        message.delete();
        bot.commands.get('hello').execute(message, args);

    } else if(command === 'shutdown') {
        bot.commands.get('shutdown').execute(message,args,bot);

    }
});

bot.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) {
        return;
    }

    const {commandName, options} = interaction;
    if(commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true
        })
    } else if(commandName === 'rollnumber') {
        const min = options.getInteger('minimum') || 0;
        const max = options.getInteger('maximum') || 0;
        const randomNum = Math.floor(Math.random() * (max - min) + min);
        interaction.reply({
            content: `Your number is: ${randomNum}`,
            ephemeral: false
        })
    }
})


//* for async code
bot.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'avatar') {
        bot.commands.get('avatar').execute(message,args,bot);
    } else if(command === 'banner') {
        bot.commands.get('banner').execute(message,args,bot);
    }

});


bot.login(process.env.DJS_TOKEN);