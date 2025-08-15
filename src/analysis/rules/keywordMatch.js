export function keywordMatch(item, keywords = []) {
  if (!item || !item.text) return 0;
  const text = item.text.toLowerCase();
  const matches = keywords.filter(k => text.includes(k.toLowerCase()));
  return matches.length / (keywords.length || 1);
}
