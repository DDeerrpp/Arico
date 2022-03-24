module.exports = {
    name: 'banner',
    description: "gets user banner",
    async execute(message,args,bot) {
        if(args.length && args[0].length == 18) {
            try {
                //! await is needed to have this call in order to catch errors
                await bot.users.fetch(args[0]).then(myUser => {
                        message.channel.send(myUser.bannerURL({dynamic: true, size: 4096}))
                })
            } catch(err) {
                message.channel.send("Input correct ID")
            }
        } else {
            message.channel.send('Input correct ID')
        }
    }
}