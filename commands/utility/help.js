const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help command!"),
  async execute(interaction) {
    const commands = await generateHelp();
    const exampleEmbed = new EmbedBuilder()

      .setColor(0x0099ff)
      .setTitle("Help command")
      .setDescription("List of commands")
      .setThumbnail(interaction.client.user.avatarURL())
      .addFields({
        name: "Commands",
        value: commands
          .map((command) => `\`${command.name}\` : ${command.description}`)
          .join("\n"),
      })
      .setTimestamp();
    interaction.reply({ embeds: [exampleEmbed] });
  },
};

async function generateHelp() {
  const commands = [];
  const foldersPath = path.join(__dirname, "../../commands");
  const commandFolders = fs.readdirSync(foldersPath);
  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
  return commands; // Return the commands array
}
