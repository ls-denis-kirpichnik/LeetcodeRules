class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function createCircularLinkedList(n) {
  const arr = new Array(n);

  let head = new Node(1);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    let newNode = new Node(i + 1);
    current.next = newNode;
    current = newNode;
  }

  current.next = head; // Connect the last node back to the head to create a circular list
  return head;
}

var findTheWinner = function (n, k) {
  const friendHead = createCircularLinkedList(n);

  let prev = null;
  let current = friendHead;
  let count = n;
  let moveCount = 1;

  while (count > 1) {
    if (moveCount === k) {
      //remove this friend
      prev.next = current.next;
      current.next = null;

      current = prev.next;
      moveCount = 1;
      count--;
    } else {
      prev = current;
      current = current.next;
      moveCount++;
    }
  }

  return current.value;
};

console.log(findTheWinner(5, 2));

var findTheWinner = function (n, k) {
  let winnerPosition = 0;

  for (let i = 2; i <= n; i++) {
    winnerPosition = (winnerPosition + k) % i;
  }

  return winnerPosition + 1;
};

var findTheWinner = function (n, k) {
  let result = 0;
  for (let time = 2; time <= n; time++) {
    result = (result + k) % time;
  }
  result++;
  return result;
};

function findTheWinner(n, k) {
  const friends = new Array(n).fill(0).map((_, i) => i + 1);
  let index = 0;

  while (friends.length > 1) {
    index = (index + k - 1) % friends.length;
    friends.splice(index, 1);
  }

  return friends[0];
}
