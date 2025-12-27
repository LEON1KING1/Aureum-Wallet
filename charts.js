const canvas = document.getElementById("portfolioChart");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 40;
canvas.height = 220;

// بيانات Testnet تجريبية
let portfolioData = [900, 1100, 1050, 1300, 1500];
let tonPriceData = [2.0, 2.1, 2.05, 2.2, 2.3];

function drawLine(data, color, maxValue) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  data.forEach((value, i) => {
    const x = (i / (data.length - 1)) * canvas.width;
    const y = canvas.height - (value / maxValue) * canvas.height;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });

  ctx.stroke();
}

function renderChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawLine(
    portfolioData,
    "#f5c542",
    Math.max(...portfolioData)
  );

  drawLine(
    tonPriceData,
    "#4da6ff",
    Math.max(...tonPriceData)
  );
}

renderChart();