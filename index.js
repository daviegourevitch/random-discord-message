const { Client, GatewayIntentBits } = require("discord.js");

const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
	console.log("Ready!");
});

// https://discord.js.org/#/docs/discord.js/main/class/BaseInteraction
client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === "ping") {
		await doPing(interaction);
	} else if (commandName === "archive") {
		await doArchive(interaction);
	}
});

async function doPing(interaction) {
	return interaction.reply("Pong!");
}

// interaction is a ChatInputCommandInteraction, extends CommandInteraction
async function doArchive(interaction) {
	const channel = interaction.options.getChannel("channel"); // user input
	await interaction.reply(`Beginning to archive channel ${channel.name}`)
	await fetchAllMessages(channel);
	await interaction.followUp("Done");
}

client.login(token);

async function fetchAllMessages(channel) {
	let messages = [];
  
	// Create message pointer
	let message = await channel.messages
	  .fetch({ limit: 1 })
	  .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
  
	while (message) {
		const messagePage = await channel.messages.fetch({ limit: 100, before: message.id });
		messagePage.forEach(msg => messages.push(msg));
		message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
	}
  
	console.log(messages);  // Print all messages
  }