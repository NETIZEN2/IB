export async function fetchPriorityFeed() {
  const res = await fetch('/api/priority-feed');
  if (!res.ok) {
    throw new Error('Failed to fetch priority feed');
  }
  return res.json();
}
