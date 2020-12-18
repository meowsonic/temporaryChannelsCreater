const { Client, Collection } = require('discord.js')
const fs = require('fs')
const bot = new Client()

// Configuration
const { token, createRoomId, guildId, createdRoomCagetory, prefix, roomPermissions } = require('./config.json')

// Utils
const createChannel = require('./utils/channelCreate')
const removeExtraSpaces = require('./utils/removeExtraSpaces')

// Collections
bot.commands = new Collection()
bot.aliases = new Collection()

// Commands loader
fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err)

    const filteredFiles = files.filter(f => f.split('.').pop() === 'js')
    if (!filteredFiles) return console.error('Commands not found!')

    filteredFiles.forEach(f => {
        const props = require(`./commands/${f}`)

        const meta = props.meta
        const name = meta.name

        bot.commands.set(name, props)

        meta.aliases.forEach(alias => bot.aliases.set(alias, name))
        console.log(`Command ${f} loaded!`)
    })
})


bot
    .on('ready', () => console.log(`${bot.user.tag} is ready`))
    .on('message', async msg => {
        const { content, channel, author } = msg
        if (channel.type === 'dm' || author.bot) return

        const msgArr = content.split(' ')
        const cmd = msgArr[0].slice(prefix.length).toLowerCase()
        const args = removeExtraSpaces(msgArr.slice(1))

        const commandFile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))

        if (content.startsWith(prefix) && commandFile) {
            if (msg.deletable) msg.delete()

            commandFile.fn(bot, msg, args)
        }
    })
    .on('voiceStateUpdate', (oldMember, newMember) => {
        const oldVoiceChannel = oldMember.channel
        const newVoiceChannel = newMember.channel

        const guild = bot.guilds.cache.get(guildId)

        const user = !newMember.member.user.bot && !oldMember.member.user.bot

        if (!user) return

        if (newVoiceChannel && newVoiceChannel.id === createRoomId) return createChannel(guild, newMember.member.displayName || '🏠', {
            type: 'voice',
            permissionOverwrites: [
                {
                    id: newMember.id,
                    allow: roomPermissions || ['VIEW_CHANNEL', 'MANAGE_CHANNELS'],
                }
            ],
            parent: createdRoomCagetory || newVoiceChannel.parentID
        })
            .then(ch => newMember.setChannel(ch))

        if (oldVoiceChannel.parentID === createdRoomCagetory && oldVoiceChannel.id !== createRoomId && oldVoiceChannel.members.size < 1) return oldVoiceChannel.delete()
    })
    .login(token)