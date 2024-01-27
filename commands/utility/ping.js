const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping command"),
  async execute(interaction) {
    const ping = Math.round(interaction.client.ws.ping);
    await interaction.reply(`Webscoket Ping is ${ping}ms`);
  },
};
