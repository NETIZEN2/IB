export default {
  name: 'entities',
  analyze: async (text) => {
    const regex = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g;
    const entities = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      entities.add(match[1]);
    }
    return Array.from(entities);
  }
};
