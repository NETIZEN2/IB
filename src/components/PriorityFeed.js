import { fetchPriorityFeed } from '../api/fetchPriorityFeed.js';

export async function initPriorityFeed() {
  const feed = document.getElementById('priority-feed');
  if (feed) {
    try {
      const data = await fetchPriorityFeed();
      feed.innerHTML = `<p class="text-gray-600">${data.message}</p>`;
    } catch (e) {
      feed.innerHTML = '<p class="text-red-600">Failed to load priority feed.</p>';
    }
  }
}
