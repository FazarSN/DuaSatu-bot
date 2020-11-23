// Run dotenv
require('dotenv').config();

// Import libraries
const Discord = require('discord.js');
const client = new Discord.Client();
const masterId = process.env.MASTER_ID

// Event listener when a user connected to the server.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

async function f(message) {
	var currentChannel = message.channel;
	var f = null;
	for (var i = 0; i < 1000; i++) {
		f = currentChannel.fetchMessages({ limit: 1 }).then(msg => {					
			msg.first().delete().catch(console.log("process1"));
		}).catch(console.log("process2"));
	}
	await f;
}

// Event listener when a user sends a message in the chat.
client.on('message', message => {
	if (message.author.bot) return;

	let command = message.content.split(" ")[0];
	let args = message.content.split(" ").slice(1);

	if (message.author.id == masterId) {
		if (command == "!delete") {
			message.channel.bulkDelete(args[0]).then(() => { message.channel.send("Deleted "+args[0]+" messages.").then(msg => msg.delete(1000));
			}).catch(console.error);
		} else if (command == "!welcome") {
			message.channel.send("Selamat Datang!");
		} else if (command == "!clearall") {
			f(message);
			message.channel.send("Clear Done!");
			console.log("clear done");
		} else if (command == "!testbot") {
			console.log("Tested!");
		} else if (command == "!sendlink") {
			message.channel.bulkDelete(1);
			console.log("sending message");
			var judul = "Episode 8 - The Fault in Our Stars"
			var listennotes = "https://lnns.co/8aOMXw14NDK";
			var spotify = "https://open.spotify.com/episode/41lcFsNU4qJybl0WLyszqq?si=ziS1lPsMSSeUrNl4tnnrVg";
			var imageFile = "episode-8.jpg";
			message.channel.send(judul + " \n\n listennotes : " + listennotes + "\n spotify : " + spotify, {files: [imageFile]});
		}
	} else {
		console.log(message.author.id + " - " + message.author.username)
		return;
	}
});

// Initialize bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);
