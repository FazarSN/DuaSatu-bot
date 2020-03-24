// Run dotenv
require('dotenv').config();

// Import libraries
const Discord = require('discord.js');
const client = new Discord.Client();

// Event listener when a user connected to the server.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener when a user sends a message in the chat.
client.on('message', message => {
	if (message.author.bot) return;

	let command = message.content.split(" ")[0];
	let args = message.content.split(" ").slice(1);

	if (message.author.id == '356302176060047361') {
		if (command == "!delete") {
			message.channel.bulkDelete(args[0]).then(() => { message.channel.send("Deleted "+args[0]+" messages.").then(msg => msg.delete(1000));
			}).catch(console.error);
		}
	} else {
		console.log(message.author.username)
		return;
	}
});

// Initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);
