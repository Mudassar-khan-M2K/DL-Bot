const { BOT_NAME } = require("../config");

module.exports = {
  pattern: "menu",

  run: async (conn, msg, { from }) => {
    const menu = `
DL-Bot Menu

General:
.ping
.uptime
.about
.owner
.source

Media:
.ytmp4
.ytmp3
.insta
.tiktok
.pinterest
.img
`;

    await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/g9u55s.jpg" },
      caption: menu
    }, { quoted: msg });
  }
};
