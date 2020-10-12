const Discord = require('discord.js')
const axios = require('axios')
const client = new Discord.Client()

//ohhhhh like in groovy, how we put -play
const prefix = '-'

const fs = require('fs')

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.once('ready', () =>{
    console.log('Bot is online!')
})


client.on('message', async message =>{

    if(!message.content.startsWith(prefix) || message.author.bot)
    return

    const args = message.content.slice(prefix.length).split(' ')
    const command = args.shift().toLowerCase()

    if(command === 'plz') {
        client.commands.get('plz').execute(message, args)
    }
    else if (command === 'basic'){
        client.commands.get('basic').execute(message, args)
    }
    else if (command === 'calum' || command === 'devin' || command === 'makoto' || command === 'kenny' || command === 'danielle' || command === 'david'){
        client.commands.get('best').execute(message, args)
    }
    else if (command === 'devingit'){
        client.commands.get('devingit').execute(message, args)
    }
    //league search omdb
    else if (command === `champ`){
        let getChamp = async () => {
            let response = await axios.get('http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json')
            let champion = response.data.data
            return champion
        }
        let champSelect = await getChamp()
        // console.log(champSelect.Aatrox.name)
        message.channel.send(champSelect.Aatrox.name + '\n' + champSelect.Aatrox.title + '\n' + champSelect.Aatrox.blurb)
    }
    else {
        message.channel.send('Not a known command')
    }
})



client.login('NzY1Mjg5NzA2MTgyMjc5MjI5.X4SplA.XtTkH7bbITqVvm-r4D-F7Rqw_VE')