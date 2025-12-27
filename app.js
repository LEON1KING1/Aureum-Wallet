const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;
if (user) {
  document.getElementById("user").innerText =
    `@${user.username || user.first_name}`;
}

function showBalance() {
  document.getElementById("content").innerHTML = `
    <div class="card">
      <h2>Total Balance</h2>
      <p>2.45 ETH</p>
      <p>≈ $7,200</p>
    </div>
  `;
}

async function showWallets() {
  const res = await fetch('data/wallets.json');
  const wallets = await res.json();

  let html = '';
  wallets.forEach(w => {
    html += `
      <div class="card">
        <h3>${w.name}</h3>
        <p>${w.address}</p>
        <p>${w.balance}</p>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

async function showNFTs() {
  const res = await fetch('data/nfts.json');
  const nfts = await res.json();

  let html = '';
  nfts.forEach(nft => {
    html += `
      <div class="card">
        <img src="${nft.image}">
        <h3>${nft.name}</h3>
        <p>${nft.price}</p>
        <button>Buy</button>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

async function showMarkets() {
  const res = await fetch('data/markets.json');
  const markets = await res.json();

  let html = '';
  markets.forEach(m => {
    html += `
      <div class="card">
        <h3>${m.coin}</h3>
        <p>${m.price}</p>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

showBalance();
