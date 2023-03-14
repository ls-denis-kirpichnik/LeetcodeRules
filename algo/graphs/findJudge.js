var findJudge = function (n, trust) {
  const count = new Array(n + 1).fill(0); //[0,0,0]

  // [0, -1, 1]
  for (let [self, trustee] of trust) {
    count[self]--;
    count[trustee]++;
  }

  console.log("count", count);

  for (let i = 1; i <= n; ++i) {
    if (count[i] == n - 1) return i;
  }
  return -1;
};

console.log(findJudge(2, [[1, 2]]));
