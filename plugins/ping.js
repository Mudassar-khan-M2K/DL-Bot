module.exports = {
  pattern: "ping",
  run: async (conn, msg, { reply }) => {
    reply("Pong!");
  }
};
