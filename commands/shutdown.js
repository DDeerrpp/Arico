module.exports = {
    name: 'shutdown',
    description: 'shutdowns the bot by command',
    execute(message,args,bot) {
        message.channel.send("Shutting down...").then(msg => {
            setTimeout(() => process.exit(), 3000);
        })
    }
}