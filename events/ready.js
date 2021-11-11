module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('Ready!');
    
      client.user.setActivity("for /help", {type: "WATCHING"})
      
	},
};