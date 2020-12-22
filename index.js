
const Discord = require("discord.js");
const chalk = require("chalk");
const client = new Discord.Client();
const config = require("./config");

client.on("ready", async () => {

    await client.user.setActivity(config.game);
    console.log("[!] INICIADO!");
});


client.on("guildMemberAdd", (member) => {
    let nivelconta = level(member.user, false, false);
    console.log(chalk.blue("["+nivelconta+"] ")+chalk.green(member.user.tag));
    if(nivelconta < 2) return;
    member.send(config.sentences.banned
        .replace("{guild}", member.guild.name)
    );
    member.guild.channels.get(config.logs).send(config.sentences.logs
        .replace("{user}", member.user.tag)
        .replace("{guild}", member.guild.name)
    );
    member.ban("Self");
    console.log(chalk.red("[+] Usuário Banido [+]")+chalk.keyword("red")(member.user.tag));
});

client.on("message", async (message) => {
    let nivelconta = level(message.author, message.content, message.nonce);
    console.log(chalk.blue("["+nivelconta+"] ")+chalk.green(message.author.tag));
    if(nivelconta < 4) return;
    message.delete();
    message.author.send(config.sentences.banned
        .replace("{guild}", message.guild.name)
    );
    message.guild.channels.get(config.logs).send(config.sentences.logs
        .replace("{user}", message.author.tag)
        .replace("{guild}", message.guild.name)
    );
    message.member.ban("Self");
    console.log(chalk.red("[+] Usuário Banido [+]")+chalk.keyword("red")(message.author.tag));
});


client.on("guildCreate", (guild) => {
 
    if(config.whitelist.enabled){
        if(!config.whitelist.guilds.includes(guild.id)){
            guild.fetchMembers().then((g) => {
                g.members.get(g.ownerID).send(config.sentences.whitelist);
                guild.leave();
            });
        }
    }
});

client.login(config.token);

/**
 * Verifique um usuário e uma mensagem para obter o nível
 * @param {object} user O objeto do usuário a ser verificado
 * @param {string} content O conteúdo da mensagem a verificar (opcional)
 * @param {string} nonce A assinatura da mensagem (opcional)
 */
function level(user, content, nonce){
    if(user.bot) return 0;
    let level = 0;

    let username = /^[a-z]+[0-9]+$/;
    if(user.username.match(username)) level++;
    let avatar = user.avatar;
    if(!avatar) level++;
    let creationDate = user.createdTimestamp;
    if(creationDate > (Date.now()-259200000)) level++;

    if(content){
        if(content.includes("https://")) level++;
        if(content.includes("hotos")) level = level+2;
    }

    let devices = user.presence.clientStatus, isMobile = false;
    if(devices) for(let device in user.presence.clientStatus) if(device === "mobile") isMobile = true;
    if(typeof nonce === "object" && !isMobile) level++
    return level;
}
