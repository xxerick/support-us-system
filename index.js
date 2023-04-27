const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

 
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
      status: "dnd",
      activity: { name: "baby#1337", type: "WATCHING" },
    });
});

client.on("presenceUpdate", async (oldMember, newMember) => {
            if (!oldMember || !newMember) return;
            const guild = oldMember.guild
            if(oldMember.status !== newMember.status) return
            const roleId = config.roleId;
            const message = config.message;
            const role = guild.roles.cache.get(roleId)
            if (!role || role.deleted) return;
            let status = newMember.activities.map(a => a.state)
            const member = guild.members.cache.get(newMember.user.id);
            if (!member) return;
            if (status[0] != null && status[0].includes(message)) {
                member.roles.add(roleId, 'Support System | baby#1337')
                     const embed = new Discord.MessageEmbed()
                    .setTitle(`Status Added`)
                    .setColor(`#2F3136`)
                    .setFooter(`Made by baby#1337`)
                    .setDescription(`\`${member.user.tag}\` added the status and got the role \`${role.name}\``)
                    client.channels.cache.get(config.logs).send(embed)
            } else {
                if (member.roles.cache.some((r) => r.id === roleId)) {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Status Removed or Offline`)
                    .setColor(`#2F3136`)
                    .setFooter(`Made by baby#1337`)
                    .setDescription(`\`${role.name}\` revoked from \`${member.user.tag}\``)
                    client.channels.cache.get(config.logs).send(embed)
                    member.roles.remove(roleId, 'Support System | baby#1337')
                }
              }

        
});  

client.login(config.TOKEN);
