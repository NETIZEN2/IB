const lexicon = {
  good: 1,
  happy: 1,
  excellent: 2,
  bad: -1,
  sad: -1,
  terrible: -2,
  amazing: 2,
  beautiful: 1,
  love: 1,
  loved: 1,
  hate: -1,
  hated: -1,
  horrible: -2,
  great: 1,
  positive: 1,
  negative: -1
};

export default {
  name: 'sentiment',
  analyze: async (text) => {
    const words = text.toLowerCase().match(/\b[a-z']+\b/g) || [];
    let score = 0;
    words.forEach(word => { if (lexicon[word]) score += lexicon[word]; });
    return { score, comparative: words.length ? score / words.length : 0 };
  }
};
