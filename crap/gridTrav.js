var uniquePaths = function (m, n) {
  // Create dp array
  const dp = new Array(n + 1).fill(1);

  // Populate dp array
  for (let row = m - 1; row > 0; row--) {
    for (let col = n - 1; col > 0; col--) {
      dp[col] = dp[col] + dp[col + 1];
    }
  }

  return dp[1];
};

[1, 1, 1, 1];
[1, 1, 2, 1];
[1, 3, 2, 1];

console.log(uniquePaths(2, 3));
