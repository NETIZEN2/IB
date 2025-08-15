export async function fetchNewsApi(urls = []) {
  const allItems = [];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const articles = data.articles || [];
      articles.forEach(a => {
        allItems.push({
          title: a.title || '',
          content: a.description || '',
          source: a.source?.name || url,
          timestamp: a.publishedAt
        });
      });
    } catch (err) {
      console.error('API fetch failed', err);
    }
  }
  return allItems;
}
