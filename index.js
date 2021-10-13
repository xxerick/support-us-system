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
           client.guilds.cache.filter(g => g.id).forEach(guild => {

            if (!oldMember || !newMember) return;
            if(oldMember.status !== newMember.status) return
            const roleId = config.roleId;
            const message = config.message;
            const role = guild.roles.cache.get(roleId)
            if (!role || role.deleted) return;
            let status = newMember.activities.map(a => a.state)
            const member = guild.members.cache.get(newMember.user.id);
            if (!member) return;
            if (status[0] && status[0].includes(message)) {
                member.roles.add(roleId, 'Support System | baby#1337')
            } else {
                if (member.roles.cache.some((r) => r.id === roleId)) {
                    member.roles.remove(roleId, 'Support System | baby#1337')
                }
              }
        });
        
});  

client.login(config.TOKEN);


