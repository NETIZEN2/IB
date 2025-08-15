let Llib;
if (typeof window === 'undefined') {
  Llib = (await import('leaflet')).default;
} else {
  Llib = window.L;
}
const L = Llib;

export function renderGeoMap(elementId, points) {
  const map = L.map(elementId).setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  points.forEach(p => {
    L.marker([p.lat, p.lng]).addTo(map).bindPopup(p.label || '');
  });
  return map;
}
