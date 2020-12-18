const path = require('path')

// Utils
const sendMessage = require('../utils/sendEmbed')

const { aliases, roomUserLimit } = require('../config.json')

module.exports = {
    meta: {
        name: path.basename(__filename, '.js'),
        aliases: aliases.limit || ['']
    }, fn: async (bot, msg, args) => {
        const { member, channel } = msg
        const voiceChannel = member.voice.channel

        const newLimit = args[0]

        if (newLimit > 99 || newLimit < 0 || !Number.isInteger(newLimit)) return sendMessage(member, { color: '#ff0000', desc: 'Invalid value!' })

        const limit = roomUserLimit > 0 ? newLimit > roomUserLimit ? roomUserLimit : newLimit : newLimit

        if (!voiceChannel) return
        if (!voiceChannel.permissionsFor(member).has('MANAGE_CHANNELS')) return sendMessage(member, { color: '#ff0000', desc: "Missing permissions!" })

        voiceChannel.edit({ userLimit: limit })

        sendMessage(channel, { color: '#36393f', desc: `New channel limit is ${limit}` })
    }
}