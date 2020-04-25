const Command = require("../../structures/Command.js");
const { MessageEmbed } = require("discord.js");

class Badge extends Command {
  constructor(...args) {
    super(...args, {
      description: "Get a themed badge from robohash.org",
      usage: "badge [@user] [set]",
      extendedHelp: "These are your unique hashes generated by your user ID.",
      aliases: ["robohash"]
    });
  }

  async run(ctx, [user, set = 1]) {
    user = await this.verifyUser(ctx, user, true);

    if(isNaN(parseInt(set)) || (parseInt(set) < 0 || parseInt(set) > 5))
      return ctx.reply("Set must be a number between 1 to 5");

    return ctx.reply(new MessageEmbed()
      .setImage(`https://robohash.org/${user.id}?set=set${set}`)
      .setTitle(`${ctx.author.tag}'s unique RoboHash.org Set ${set} Avatar.`)
      .setColor(0x9590EE)
      .setFooter(`Requested by ${ctx.author.tag}`, ctx.author.displayAvatarURL({ size: 256 }))
      .setTimestamp());
  }
}

module.exports = Badge;