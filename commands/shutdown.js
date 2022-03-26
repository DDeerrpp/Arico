module.exports = {
    name: 'shutdown',
    description: 'shutdowns the bot by command',
    execute(message,args,bot) {
        
        process.exit();
    }
}