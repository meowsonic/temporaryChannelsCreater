const path = require('path')

// Utils
const sendMessage = require('../utils/sendEmbed')

const { aliases } = require('../config.json')

module.exports = {
    meta: {
        name: path.basename(__filename, '.js'),
        aliases: aliases.name || ['']
    }, fn: async (bot, msg, args) => {
        const { member, channel } = msg
        const voiceChannel = member.voice.channel

        const newName = args.join(' ')

        if (newName.length > 24) return sendMessage(channel, { color: '#ff0000', desc: 'Name length too long' })

        if (!voiceChannel) return
        if (!voiceChannel.permissionsFor(member).has('MANAGE_CHANNELS')) return sendMessage(member, { color: '#ff0000', desc: "Missing permissions!" })

        voiceChannel.edit({ name: newName })

        sendMessage(channel, { color: '#36393f', desc: 'Channel name changed!' })
    }
}