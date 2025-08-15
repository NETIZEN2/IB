import Chart from 'chart.js/auto';

/**
 * Render a line chart showing sentiment over time.
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context where chart will render.
 * @param {Array<{date: string, sentiment: number}>} data - Sentiment data points.
 */
export function renderSentimentTimeline(ctx, data) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((d) => d.date),
      datasets: [
        {
          label: 'Sentiment',
          data: data.map((d) => d.sentiment),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: -1,
          max: 1,
        },
      },
    },
  });
}
