const ytdl = require("@distube/ytdl-core");

module.exports = {
  pattern: "ytmp3",

  run: async (conn, msg, { args, reply, from }) => {
    if (!args[0]) return reply("Provide URL");

    const stream = ytdl(args[0], { filter: "audioonly" });

    await conn.sendMessage(from, {
      audio: stream,
      mimetype: "audio/mp4"
    }, { quoted: msg });
  }
};
