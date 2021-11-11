const { REST } = require('@discordjs/rest');

const { Routes } = require('discord-api-types/v9');

const token = ""

const fs = require('fs');

const { Client, Collection, Intents } = require('discord.js');

const client = new Client({

  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES,],

  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],

});

//----------------Load Events-----------\\

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {

  const event = require(`./events/${file}`);

  if (event.once) {

    client.once(event.name, (...args) => event.execute(...args, client));

  } else {

    client.on(event.name, (...args) => event.execute(...args, client));

  }

}

//------------------Load Slash Commands------------------\\

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Collection();

for (const file of commandFiles) {

  const command = require(`./commands/${file}`);

  commands.push(command.data.toJSON());

  client.commands.set(command.data.name, command);

}

//------------------Slash Commands Refresh------------------\\

const rest = new REST({ version: '9' }).setToken(token);

(async () => {

  try {

    console.log('Started refreshing application (/) commands.');

    await rest.put(

      Routes.applicationCommands("applicationid"),

      { body: commands },

    );

    

    console.log('Successfully loaded application (/) commands.');

  } catch (error) {

    console.error(error);

  }

})();

//------------------Message Command Handler------------------\\

fs.readdir(`./mCommands/`, (error, files) => {

  client.mCommands = new Collection();

  client.aliases = new Collection();

  if (error) { return console.log("Error while trying to get the commmands."); };

  files.forEach(file => {

    const command = require(`./mCommands/${file}`);

    const commandName = file.split(".")[0];

    console.log(`Attempting to load command ${commandName}`);

    client.mCommands.set(commandName, command);

    if (command.aliases) {

      command.aliases.forEach(alias => {

        client.aliases.set(alias, command);

      });

    };

  });

});



client.login(token);
