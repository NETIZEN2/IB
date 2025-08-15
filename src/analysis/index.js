import entityPlugin from './entityExtractor.js';
import sentimentPlugin from './sentiment.js';
import summaryPlugin from './summary.js';

const plugins = [];

export function registerPlugin(plugin) {
  plugins.push(plugin);
}

// Register built-in plugins
registerPlugin(entityPlugin);
registerPlugin(sentimentPlugin);
registerPlugin(summaryPlugin);

export async function getAnalysis(text) {
  const results = {};
  for (const plugin of plugins) {
    results[plugin.name] = await plugin.analyze(text, results);
  }
  return results;
}
