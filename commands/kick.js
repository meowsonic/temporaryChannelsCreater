const path = require('path')

// Utils
const sendMessage = require('../utils/sendEmbed')

const { aliases } = require('../config.json')

module.exports = {
    meta: {
        name: path.basename(__filename, '.js'),
        aliases: aliases.kick || ['']
    }, fn: async (bot, msg, args) => {
        const { member, channel, mentions, guild } = msg
        const voiceChannel = member.voice.channel
        if (!voiceChannel) return

        const selectedUser = mentions.members.first() || guild.members.cache.get(args[0])
        if (!selectedUser) return

        if (!voiceChannel.permissionsFor(member).has('MANAGE_CHANNELS')) return sendMessage(member, { color: '#ff0000', desc: "Missing permissions!" })

        voiceChannel.overwritePermissions(selectedUser, {
            CONNECT: false
        })

        sendMessage(channel, { color: '#36393f', desc: `${member} kicked ${selectedUser} from voice channel` })
    }
}