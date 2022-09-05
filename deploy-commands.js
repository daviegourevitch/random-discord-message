const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { client_id, token } = require("./config.json");

const commands = [
	new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with pong!"),
	new SlashCommandBuilder()
		.setName("archive")
		.setDescription("archives the continent of an entire channel")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("The channel to pull from")
				.setRequired(true)
		),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest
	.put(Routes.applicationCommands(client_id), { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
