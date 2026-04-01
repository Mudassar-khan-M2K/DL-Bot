const fs = require("fs");
const { PREFIX, MODE, OWNER_NUMBER } = require("./config");

const plugins = [];

fs.readdirSync("./plugins").forEach(file => {
  if (file.endsWith(".js")) {
    plugins.push(require(`./plugins/${file}`));
  }
});

module.exports = async (conn, msg) => {
  try {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith("@g.us");

    const sender = isGroup
      ? msg.key.participant
      : from;

    const senderNum = sender.split("@")[0];

    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      "";

    if (!body.startsWith(PREFIX)) return;

    if (MODE === "private" && senderNum !== OWNER_NUMBER) return;
    if (MODE === "inbox" && isGroup) return;
    if (MODE === "groups" && !isGroup) return;

    const command = body.slice(PREFIX.length).split(" ")[0];
    const args = body.split(" ").slice(1);

    for (let plugin of plugins) {
      if (plugin.pattern === command) {
        await plugin.run(conn, msg, {
          from,
          sender,
          args,
          isGroup,
          isCreator: senderNum === OWNER_NUMBER,
          reply: (txt) => conn.sendMessage(from, { text: txt }, { quoted: msg })
        });
      }
    }
  } catch (e) {
    console.log("Handler Error:", e);
  }
};
