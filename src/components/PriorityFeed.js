export function initPriorityFeed(items = []) {
  const feed = document.getElementById('priority-feed');
  if (feed) {
    if (!items.length) {
      feed.innerHTML = '<p class="text-gray-600">No items available.</p>';
      return;
    }
    const list = items.map(item => `\n      <li class=\"mb-2\">\n        <a href=\"${item.url}\" class=\"text-blue-600\">${item.title}</a>\n        <span class=\"block text-xs text-gray-500\">${new Date(item.date).toLocaleString()} </span>\n      </li>`).join('');
    feed.innerHTML = `<ul>${list}\n    </ul>`;
  }
}
