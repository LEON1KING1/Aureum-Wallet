const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl:
    "https://leon1king1.github.io/Aureum-Wallet/tonconnect-manifest.json"
});

const connectBtn = document.getElementById("connect");
const addressEl = document.getElementById("address");
const balanceEl = document.getElementById("balance");

const sendBtn = document.getElementById("sendBtn");
const sendAddressInput = document.getElementById("sendAddress");
const sendAmountInput = document.getElementById("sendAmount");
const txStatus = document.getElementById("txStatus");

let wallet;

connectBtn.onclick = async () => {
  wallet = await tonConnectUI.connectWallet();
};

tonConnectUI.onStatusChange(async newWallet => {
  if (!newWallet) return;
  wallet = newWallet;
  addressEl.innerText = wallet.account.address;

  // جلب الرصيد الحقيقي
  const res = await fetch(`https://tonapi.io/v2/accounts/${wallet.account.address}`);
  const json = await res.json();
  const balanceTon = (json.balance / 1e9).toFixed(4);
  balanceEl.innerText = `${balanceTon} TON`;
});

// Send TON Function
sendBtn.onclick = async () => {
  const toAddr = sendAddressInput.value.trim();
  const amountTon = parseFloat(sendAmountInput.value);

  if (!wallet || !toAddr || !amountTon) {
    txStatus.innerText = "Invalid data";
    return;
  }

  txStatus.innerText = "Sending...";

  await wallet.sendTransaction({
    messages: [
      {
        address: toAddr,
        amount: amountTon * 1e9 // TON to nanotons
      }
    ]
  });

  txStatus.innerText = "Sent ✔️";
};