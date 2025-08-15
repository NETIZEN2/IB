const isNode = typeof window === 'undefined';

function normalizeItem(raw, source) {
  return {
    title: raw.title || raw.headline || 'Untitled',
    url: raw.link || raw.url || '',
    date: raw.pubDate || raw.date || new Date().toISOString(),
    source
  };
}

async function fetchRSS(url) {
  const res = await fetch(url);
  const text = await res.text();
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(text)) !== null) {
    const itemXML = match[1];
    const titleMatch = /<title>(.*?)<\/title>/i.exec(itemXML);
    const linkMatch = /<link>(.*?)<\/link>/i.exec(itemXML);
    const dateMatch = /<pubDate>(.*?)<\/pubDate>/i.exec(itemXML);
    items.push(normalizeItem({
      title: titleMatch ? titleMatch[1] : 'Untitled',
      link: linkMatch ? linkMatch[1] : '',
      pubDate: dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString()
    }, url));
  }
  return items;
}

async function fetchAPI(url) {
  const res = await fetch(url);
  const data = await res.json();
  const items = Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : [];
  return items.map(item => normalizeItem(item, url));
}

async function fetchFile(path) {
  if (isNode) {
    const fs = await import('fs/promises');
    const text = await fs.readFile(path, 'utf-8');
    const data = JSON.parse(text);
    return Array.isArray(data) ? data.map(item => normalizeItem(item, path)) : [];
  } else {
    const res = await fetch(path);
    const data = await res.json();
    return Array.isArray(data) ? data.map(item => normalizeItem(item, path)) : [];
  }
}

async function fetchFromSources(sources) {
  const all = [];
  for (const src of sources) {
    let items = [];
    if (src.type === 'rss') items = await fetchRSS(src.url);
    else if (src.type === 'api') items = await fetchAPI(src.url);
    else if (src.type === 'file') items = await fetchFile(src.path);
    all.push(...items);
  }
  return all;
}

export { normalizeItem, fetchRSS, fetchAPI, fetchFile, fetchFromSources };
