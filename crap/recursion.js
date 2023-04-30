function wow(str, reverse = "") {
  if (str === "") return reverse;

  let lastChar = str.charAt(str.length - 1);
  reverse += lastChar;

  str = str.slice(0, -1);

  return wow(str, reverse);
}

function fib(n, cache = {}) {
  if (n <= 1) return n;

  if (n in cache) return cache[n];

  let result = fib(n - 1, cache) + fib(n - 2, cache);
  cache[n] = result;

  return result;
}

console.log(fib(55));
