Temporary room creater
================
Creating a temporary voice channel.

# How it's works
User joining in specifed voice channel, bot creating a new channel and moving user to this voice. When users counts in new channel equals a 0, bot deleting channel.
Channel owner can change voice name, voice user limit, restrict connect permission to this channel and allow this permission(if permission restricted)

# Installation

1. [Install Node.js](https://nodejs.org) (latest version is preferable)
2. Install packages (`npm install` or `yarn install`)
3. Clone this project
4. Set up your Discord bot [here](https://discordapp.com/developers)
5. Set up config.json
6. `npm start` or `yarn start`

## Setting up a `config.json`
| Configuration       | Type          | Description                                                                                      |
| ------------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| Token               | String        | Your bot's access token                                                                          |
| Prefix              | String        | Prefix for bot commands                                                                          |
| GuildId             | String        | Your guild id                                                                                    |
| CreateRoomId        | String        | Specifed voice channel id to create new channel                                                  |
| CreatedRoomCategory | String        | ID of the category in which the channel is created                                               |
| RoomUserLimit       | Number        | Voice user limit(set 0 for unlimit)                                                              |
| RoomPermissions     | Array<String> | Array of permissions to channel owner(set up a "MANAGE_CHANNELS" for correclty commands working) |
| Aliases             | Object        | Command aliases                                                                                  |
| DeleteDelay         | Number        | Message deliting delay(set up 0 for no deliting)                                                 |

## `config.json` exapmle: 
```json
{
    "token": "5hJZ4sJiBkhQ90JP3YlUkjDs2C5OsO4X6uQs5AQcaB4CsxKryZUvCidM5ZG",
    "prefix": "!",
    "guildId": "247431068775481346",
    "createRoomId": "789139197335175218",
    "createRoomCategory": "789139154406604851",
    "roomUserLimit": 0,
    "roomPermissions": ["MANAGE_CHANNELS", "CONNECT", "SPEAK"],
    "aliases": {
        "name": ["channelname"],
        "limit": ["channellimit"],
        "kick": ["kickuser", "banuser"],
        "allow": ["invite"]
    },
    "deleteDelay": 0
}
```

### Notes 
1. For changing commands names just rename files in commands folder
2. For changing commands reply text, open any command file and you will see all what you need to change :)
3. For all questions or supporting, you can add me in discord by tag(ᴏʟᴇɢ#1337) or join in my [discord server](https://discord.gg/Nqa8EJp) and find me

I'm russian developer and using google translate, sorry, if something not understandable :)