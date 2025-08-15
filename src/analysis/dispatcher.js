import { keywordMatch } from './rules/keywordMatch.js';
import { trendDetector } from './rules/trendDetector.js';

function runRules(item) {
  const scores = [
    keywordMatch(item, ['urgent', 'issue']),
    trendDetector(item)
  ];
  return scores.reduce((sum, s) => sum + s, 0);
}

export async function scoreItem(item, { aiClient } = {}) {
  if (aiClient && typeof aiClient.score === 'function') {
    try {
      const aiScore = await aiClient.score(item);
      if (typeof aiScore === 'number') return aiScore;
    } catch (e) {
      console.error('AI client failed, falling back to rule-based scoring:', e);
      const fallbackScore = runRules(item);
      const err = new Error('AI client failed');
      err.fallbackScore = fallbackScore;
      throw err;
    }
  }
  return runRules(item);
}

export { keywordMatch, trendDetector };
