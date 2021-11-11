module.exports = {
    name: 'messageCreate',
    execute(message, client){
        const prefix = '-'
        
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        
        if(client.mCommands.get(command)){
          client.mCommands.get(command).execute(message, args)
        }
        else if(client.aliases.get(command)){
          client.aliases.get(command).execute(message, args);
        }
  
    },
  };