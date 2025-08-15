let ChartLib;
if (typeof window === 'undefined') {
  ChartLib = (await import('chart.js/auto')).Chart;
} else {
  ChartLib = window.Chart;
}
const Chart = ChartLib;

export function renderTimelineChart(canvasId, dataset) {
  const ctx = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataset.labels,
      datasets: [{ label: 'Events', data: dataset.data, fill: false, borderColor: '#333' }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
