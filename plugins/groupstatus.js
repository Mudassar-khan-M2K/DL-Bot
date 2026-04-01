module.exports = {
  pattern: "groupstatus",

  run: async (conn, msg, { isGroup, isCreator, reply, from }) => {

    if (!isCreator) return reply("Owner only");
    if (!isGroup) return reply("Group only");

    const metadata = await conn.groupMetadata(from);
    const mentions = metadata.participants.map(p => p.id);

    await conn.sendMessage(from, {
      text: "Group Status",
      contextInfo: { mentionedJid: mentions }
    }, { quoted: msg });
  }
};
