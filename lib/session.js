const fs = require("fs");
const zlib = require("zlib");

function loadSession(sessionId) {
  if (!sessionId) return;

  try {
    const base64 = sessionId.split("~")[1];
    const buffer = Buffer.from(base64, "base64");
    const decompressed = zlib.gunzipSync(buffer);

    fs.writeFileSync("./auth_info.json", decompressed);
    console.log("Session restored");
  } catch (e) {
    console.log("Session error:", e);
  }
}

module.exports = { loadSession };
