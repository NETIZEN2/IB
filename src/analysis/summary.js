export default {
  name: 'summary',
  analyze: async (text) => {
    const sentences = text.match(/[^.!?]+[.!?]/g) || [text];
    return sentences[0].trim();
  }
};
