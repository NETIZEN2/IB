import { readFileSync } from 'fs';

describe('index.html structure', () => {
  const html = readFileSync('index.html', 'utf8');
  const inlineScriptRegex = /<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/i;
  const inlineStyleRegex = /<style[\s\S]*?>[\s\S]*?<\/style>/i;
  const distScriptRegex = /<script[^>]*src="dist\/[^\"]+"[^>]*><\/script>/i;
  const distStyleRegex = /<link[^>]*rel="stylesheet"[^>]*href="dist\/[^\"]+"[^>]*>/i;

  test('does not contain inline scripts', () => {
    expect(inlineScriptRegex.test(html)).toBe(false);
  });

  test('does not contain inline styles', () => {
    expect(inlineStyleRegex.test(html)).toBe(false);
  });

  test('references compiled script', () => {
    expect(distScriptRegex.test(html)).toBe(true);
  });

  test('references compiled stylesheet', () => {
    expect(distStyleRegex.test(html)).toBe(true);
  });
});
