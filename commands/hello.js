module.exports = {
    name: 'hello',
    description: "test hello command",
    execute(message,args) {
        let name = message.author;
        message.channel.send(`Hello ${name}`);
    }
}