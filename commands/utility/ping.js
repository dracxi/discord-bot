const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping command"),
  async execute(interaction) {
    const ping = Math.round(interaction.client.ws.ping);
    const pingEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Ping!")
      .setDescription(`Webscoket ping is \`${ping}\`ms`)
      .setTimestamp();
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
