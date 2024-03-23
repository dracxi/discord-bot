const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Echo commands")
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Message to send")
        .setRequired(true)
    ),
  async execute(interaction) {
    const msg = interaction.options.getString("message");
    await interaction.reply(msg);
  },
};
