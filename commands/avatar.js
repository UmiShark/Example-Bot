const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('user').setDescription('The user\'s avatar to show')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		if (user){
      const avatarEmbed = new MessageEmbed()
          .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
          .setTitle("Avatar")
          .setImage(user.displayAvatarURL({size:256,dynamic:true}))
          
      return interaction.reply({ embeds: [avatarEmbed] });
    }
    const avatarEmbed = new MessageEmbed()
          .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic:true}))
          .setTitle("Avatar")
          .setImage(interaction.user.displayAvatarURL({size:256,dynamic:true}))
		return interaction.reply({embeds: [avatarEmbed]});
	},
};