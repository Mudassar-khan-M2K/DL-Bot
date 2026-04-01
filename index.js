const {
  default: makeWASocket,
  useMultiFileAuthState
} = require("@whiskeysockets/baileys");

const { loadSession } = require("./lib/session");
const handler = require("./handler");
const { SESSION_ID } = require("./config");

async function startBot() {
  loadSession(SESSION_ID);

  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    await handler(sock, msg);
  });

  console.log("DL-Bot started");
}

startBot();
