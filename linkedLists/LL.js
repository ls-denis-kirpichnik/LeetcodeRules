function profiler(func) {
  return function (...args) {
    console.time(func.name);
    const result = func(...args);
    console.timeEnd(func.name);
    return result;
  };
}

class Node {
  constructor(val) {
    this.next = null;
    this.val = val;
  }
}

const a = new Node("A");
const b = new Node("B");
const c = new Node("C");
const d = new Node("D");

a.next = b;
b.next = c;
c.next = d;
d.next = null;

function logLL(head) {
  let current = head;
  while (current !== null) {
    console.log(current.val);
    current = current.next;
  }
}

function logLLR(head) {
  if (head === null) return;
  console.log(head.val);
  logLLR(head.next);
}

function pickVals(head) {
  res = [];

  fillArr(head, res);

  return res;
}

function fillArr(head, arr) {
  if (head === null) return;
  res.push(head.val);
  fillArr(head.next, arr);
}

function sumList(head) {
  let sum = "";
  let current = head;

  while (current) {
    sum += current.val;
    current = current.next;
  }

  return sum;
}

function sumListR(head) {
  if (head === null) return "";
  return head.val + sumListR(head.next);
}

function getValue(head, index) {
  let current = head;
  i = 0;
  while (current) {
    if (index === i) console.log(current.val);
    console.log;
    i++;
    current = current.next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

function reverseListR(head, prev = null) {
  if (head === null) return prev;
  const next = head.next;
  head.next = prev;
  return reverseListR(next, head);
}

console.log(reverseListR(a));
