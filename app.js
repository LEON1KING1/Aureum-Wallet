const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl:
    "https://leon1king1.github.io/Aureum-Wallet/tonconnect-manifest.json"
});

const addressEl = document.getElementById("address");
const balanceEl = document.getElementById("balance");
const qrCanvas = document.getElementById("qr");

document.getElementById("connect").onclick = async () => {
  await tonConnectUI.connectWallet();
};

tonConnectUI.onStatusChange(async wallet => {
  if (!wallet) return;

  const address = wallet.account.address;
  addressEl.innerText = address;

  // QR for Receive
  QRCode.toCanvas(qrCanvas, address);

  // Balance (real)
  const res = await fetch(`https://tonapi.io/v2/accounts/${address}`);
  const data = await res.json();
  balanceEl.innerText = (data.balance / 1e9).toFixed(3) + " TON";
});

// Copy Address
document.getElementById("copy").onclick = () => {
  navigator.clipboard.writeText(addressEl.innerText);
  alert("Address copied");
};

// Send
document.getElementById("sendBtn").onclick = async () => {
  const wallet = tonConnectUI.wallet;
  const to = document.getElementById("sendAddress").value;
  const amount = document.getElementById("sendAmount").value;

  if (!wallet || !to || !amount) return;

  document.getElementById("txStatus").innerText = "Sending...";

  await wallet.sendTransaction({
    messages: [{
      address: to,
      amount: amount * 1e9
    }]
  });

  document.getElementById("txStatus").innerText = "Sent ✔️";
};