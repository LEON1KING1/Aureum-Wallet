const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl:
    "https://leon1king1.github.io/Aureum-Wallet/tonconnect-manifest.json"
});

document.getElementById("connect").onclick = async () => {
  await tonConnectUI.connectWallet();
};

tonConnectUI.onStatusChange(wallet => {
  if (wallet) {
    document.getElementById("address").innerText =
      wallet.account.address;

    document.getElementById("balance").innerText =
      "Wallet Connected ✔️ (Testnet)";
  }
});