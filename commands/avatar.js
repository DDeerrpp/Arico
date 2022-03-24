module.exports = {
    name: 'avatar',
    description: "gets user avatar",
    async execute(message,args,bot) {
        if(args.length && args[0].length == 18) {
            try {
                //! await is needed to have this call in order to catch errors
                await bot.users.fetch(args[0]).then(myUser => {
                        message.channel.send(myUser.avatarURL({dynamic: true, size: 2048}));
                })
            } catch(err) {
                message.channel.send("Input correct ID")
            }
        } else {
            message.channel.send('Input correct ID')
        }
    }
}