const path = require('path')

// Utils
const sendMessage = require('../utils/sendEmbed')

const { aliases } = require('../config.json')

module.exports = {
    meta: {
        name: path.basename(__filename, '.js'),
        aliases: aliases.allow || ['']
    }, fn: async (bot, msg, args) => {
        const { member, channel, mentions, guild } = msg
        const voiceChannel = member.voice.channel
        if (!voiceChannel) return

        const selectedUser = mentions.members.first() || guild.members.cache.get(args[0])
        if (!selectedUser || selectedUser.id === member.id) return

        if (!voiceChannel.permissionsFor(member).has('MANAGE_CHANNELS')) return sendMessage(member, { color: '#ff0000', desc: "Missing permissions!" })

        voiceChannel.overwritePermissions(selectedUser, {
            CONNECT: true
        })

        sendMessage(channel, { color: '#36393f', desc: `${member} allowed ${selectedUser} to join in voice channel` })
    }
}