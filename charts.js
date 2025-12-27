const canvas = document.getElementById("portfolioChart");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 40;
canvas.height = 220;

// بيانات تجريبية (Testnet)
let portfolio = [1000, 1200, 1100, 1400, 1600];
let tonPrice = [2.0, 2.1, 2.05, 2.2, 2.3];

function draw(data, color, max) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  data.forEach((v, i) => {
    const x = i * (canvas.width / (data.length - 1));
    const y = canvas.height - (v / max) * canvas.height;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function renderChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw(portfolio, "#f5c542", Math.max(...portfolio));
  draw(tonPrice, "#4da6ff", Math.max(...tonPrice));
}

renderChart();
