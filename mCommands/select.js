const { Client, Message, MessageEmbed} = require('discord.js')
const { MessageActionRow, MessageSelectMenu} = require('discord.js')
module.exports = {
    name: "select",
    description: "Sends a selection menu",
    async execute(message, args) {
        console.log("test")
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("select")
            .setPlaceholder("Select your option here!")
            .addOptions([
                {
                    label: "This is the selection 1",
                    description: "This is a description!",
                    value: "first"
                },
                {
                    label: "This is the selection 2",
                    description: "This is a description!",
                    value: "second"
                },
                {
                    label: "This is the selection 3 ",
                    description: "This is a description!",
                    value: "third"
                }

     ])
        )
        let embed = new MessageEmbed()
        .setTitle('welcome to this sever')
        .setDescription('yes this is cool')
        .setColor('BLUE')

        let sendmsg = await message.channel.send({ content: "ㅤ", ephermal:true, embeds: [embed], components:[row]})

        let embed1 = new MessageEmbed()
        .setTitle('welcome to this sever')
        .setDescription('1')
        .setColor('BLUE')
        let embed2 = new MessageEmbed()
        .setTitle('welcome to this sever')
        .setDescription('2')
        .setColor('BLUE')
        let embed3 = new MessageEmbed()
        .setTitle('welcome to this sever')
        .setDescription('3')
        .setColor('BLUE')

const collector = message.channel.createMessageComponentCollector({
    componentType: "SELECT MENU"
}) 
collector.on("collect", async (collected) => {
const value = collected.values[0]

if(value === "first") {
    collected.reply({embeds:[embed1], ephermal:true})
}
if(value === "second") {
    collected.reply({embeds:[embed2], ephermal:true})
}
if(value === "third") {
    collected.reply({embeds:[embed3], ephermal:true})
}
})




    }
}