const { MessageEmbed } = require('discord.js')

const { deleteDelay } = require('../config.json')

module.exports = (target, options) => {
    const embed = new MessageEmbed()

    embed
        .setColor(options.color)
        .setDescription(options.desc)

    return target.send(embed).then(m => deleteDelay > 0 ? m.delete({ timeout: deleteDelay * 1000 }) : null)
}