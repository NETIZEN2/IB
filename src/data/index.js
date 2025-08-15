import { fetchRSS } from './rss.js';
import { fetchNewsApi } from './api.js';
import { ingestDocuments } from './upload.js';
import { saveItems, getAllItems, clearItems } from './store.js';

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

export function normalize(item) {
  return {
    id: item.id || generateId(),
    title: item.title || '',
    content: item.content || '',
    source: item.source || '',
    timestamp: item.timestamp ? new Date(item.timestamp).toISOString() : new Date().toISOString()
  };
}

export async function refreshData(options = {}) {
  const { rssUrls = [], apiUrls = [], documents = [] } = options;
  const rssItems = await fetchRSS(rssUrls);
  const apiItems = await fetchNewsApi(apiUrls);
  const docItems = ingestDocuments(documents);
  const items = [...rssItems, ...apiItems, ...docItems].map(normalize);
  if (items.length) {
    await clearItems();
    await saveItems(items);
  }
  return items;
}

export async function loadStoredItems() {
  const items = await getAllItems();
  return items.map(i => ({ ...i, timestamp: new Date(i.timestamp) }));
}

if (typeof window !== 'undefined') {
  window.dataModule = { refreshData, loadStoredItems };
}
