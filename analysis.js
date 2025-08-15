function analyze(numbers) {
  return numbers.reduce((sum, n) => sum + n, 0);
}
module.exports = { analyze };
