export function approximateMatch(str1: string, str2: string) {
  const ratio = (str1.length - LevenshteinDistance(str1, str2)) / str1.length;
  return ratio > 0.6;
}

export function LevenshteinDistance(a: string, b: string) {
  const m = a.length;
  const n = b.length;

  if (m === 0 || n === 0) {
    return Math.max(m, n);
  }

  const matrix = [];
  for (let i = 0; i <= m; i++) {
    matrix[i] = [i];
  }

  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (a.charAt(i - 1) === b.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1));
      }
    }
  }

  return matrix[m][n];
}
