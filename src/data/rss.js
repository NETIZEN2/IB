export async function fetchRSS(urls = []) {
  const allItems = [];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'application/xml');
      const items = Array.from(doc.querySelectorAll('item')).map(it => ({
        title: it.querySelector('title')?.textContent || '',
        content: it.querySelector('description')?.textContent || '',
        source: url,
        timestamp: it.querySelector('pubDate')?.textContent
      }));
      allItems.push(...items);
    } catch (err) {
      console.error('RSS fetch failed', err);
    }
  }
  return allItems;
}
