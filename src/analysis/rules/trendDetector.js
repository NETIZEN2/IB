export function trendDetector(item) {
  if (!item || !item.metrics) return 0;
  const { current = 0, average = 0 } = item.metrics;
  if (average === 0) return current > 0 ? 1 : 0;
  return current > average ? 1 : 0;
}
