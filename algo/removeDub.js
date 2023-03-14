class Stack {
  constructor() {
    this.stack = [];
  }
  push(item) {
    this.stack.push(item);
  }
  pop() {
    return this.stack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  isEmpty() {
    return this.stack.length == 0;
  }
}

var removeDuplicateLetters = function (s) {
  const CHAR_START = 97,
    stack = new Stack();
  const used = new Array(26),
    last = new Map();

  const idx = (ch) => ch.charCodeAt() - CHAR_START;

  for (let i = 0; i < s.length; i++) {
    last.set(s[i], i);
  }
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (used[idx(ch)]) continue;
    while (!stack.isEmpty() && stack.top() > ch && i < last.get(stack.top())) {
      used[idx(stack.pop())] = false;
    }
    stack.push(ch);
    used[idx(ch)] = true;
  }
  return stack.stack.join("");
};
