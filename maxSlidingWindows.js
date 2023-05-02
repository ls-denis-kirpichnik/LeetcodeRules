// function maxSlidingWindow1(nums, k) {
//   if (!nums || nums.length === 0) {
//     return [];
//   }

//   const res = [];
//   const q = [];

//   for (let i = 0; i < nums.length; i++) {
//     if (q.length > 0 && q[0] < i - k + 1) {
//       q.shift();
//     }

//     while (q.length > 0 && nums[q[q.length - 1]] < nums[i]) {
//       q.pop();
//     }

//     q.push(i);

//     if (i >= k - 1) {
//       res.push(nums[q[0]]);
//     }
//   }

//   return res;
// }

class SlidingWindowDeque {
  constructor() {
    this.front = 0;
    this.back = -1;
    this.items = {};
  }

  addBack(element) {
    this.back++;
    this.items[this.back] = element;
  }

  removeFront() {
    const removed = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return removed;
  }

  peekFront() {
    return this.items[this.front];
  }

  peekBack() {
    return this.items[this.back];
  }

  isEmpty() {
    return this.back - this.front + 1 === 0;
  }
}

function maxSlidingWindow(nums, k) {
  if (nums.length === 0 || k === 0) {
    return [];
  }

  const result = [];
  const deque = new SlidingWindowDeque();

  for (let i = 0; i < nums.length; i++) {
    while (!deque.isEmpty() && deque.peekFront() < i - k + 1) {
      deque.removeFront();
    }

    while (!deque.isEmpty() && nums[deque.peekBack()] < nums[i]) {
      deque.back--;
    }

    deque.addBack(i);

    if (i >= k - 1) {
      result.push(nums[deque.peekFront()]);
    }
  }

  return result;
}

// let nums = [1, 3, -1, -3, 5, 3, 6, 7];
// let k = 3;
// console.log(maxSlidingWindow(nums, k));

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const max = [0];
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    while (nums[max[max.length - 1]] <= nums[i]) {
      max.pop();
    }
    max.push(i);
    // if window is in range, evaluate
    if (i >= k - 1) {
      // if earliest indice is out of range shift
      if (max[0] < i - k + 1) {
        max.shift();
      }
      result.push(nums[max[0]]);
    }
  }
  return result;
};

class Deque {
  constructor() {
    this.front = 0;
    this.back = -1;
    this.items = new Map();
  }

  addBack(element) {
    this.back++;
    this.items.set(this.back, element);
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const removed = this.items.get(this.front);
    this.items.delete(this.front);
    this.front++;
    return removed;
  }

  peekFront() {
    return this.items.get(this.front);
  }

  peekBack() {
    return this.items.get(this.back);
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.back - this.front + 1;
  }
}

function maxSlidingWindow(nums, k) {
  if (nums.length === 0 || k === 0) {
    return [];
  }

  const res = [];
  const deque = new Deque();

  for (let i = 0; i < nums.length; i++) {
    // Remove elements that are out of the current sliding window from the front of the deque
    while (!deque.isEmpty() && deque.peekFront() < i - k + 1) {
      deque.removeFront();
    }

    // Remove elements from the back of the deque that are smaller than the current element,
    // as they will not contribute to the maximum in the current sliding window
    while (!deque.isEmpty() && nums[deque.peekBack()] < nums[i]) {
      deque.removeBack();
    }

    // Add the index of the current element to the back of the deque
    deque.addBack(i);

    // If the current index (i) is equal to or greater than k - 1,
    // it means we have a complete window, so we add the maximum value (front of deque) to the result array
    if (i >= k - 1) {
      res.push(nums[deque.peekFront()]);
    }
  }

  return res;
}
