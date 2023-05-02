class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }
    return max;
  }

  peek() {
    return this.heap[0];
  }

  swap(indexA, indexB) {
    [this.heap[indexA], this.heap[indexB]] = [this.heap[indexB], this.heap[indexA]];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  bubbleUp(index) {
    const parent = this.getParentIndex(index);
    if (parent < 0 || this.heap[parent][0] >= this.heap[index][0]) return;
    this.swap(parent, index);
    this.bubbleUp(parent);
  }

  bubbleDown(index) {
    const left = this.getLeftChildIndex(index);
    const right = this.getRightChildIndex(index);
    let largest = index;

    if (left < this.heap.length && this.heap[left][0] > this.heap[largest][0]) {
      largest = left;
    }

    if (right < this.heap.length && this.heap[right][0] > this.heap[largest][0]) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(largest, index);
      this.bubbleDown(largest);
    }
  }
}

// Overall --- O(k + (n - k) * log k), worst case O(n * log n)
function maxSlidingWindow(nums, k) {
  if (!nums || k === 0) {
    return [];
  }

  const n = nums.length;
  if (k === 1) {
    return nums;
  }

 
  const maxHeap = new MaxHeap();
  // O(k)
  for (let i = 0; i < k; i++) {
    maxHeap.push([nums[i], i]);
  }

  const output = [maxHeap.peek()[0]];

   // (n - k) * log k), inserting and removing takes O(log k)
  for (let i = k; i < n; i++) {
    maxHeap.push([nums[i], i]);
    while (maxHeap.peek()[1] <= i - k) {
      maxHeap.pop();
    }
    output.push(maxHeap.peek()[0]);
  }

  return output;
}

// const maxHeap = new MaxHeap();
// maxHeap.insert(42);
// maxHeap.insert(32);
// maxHeap.insert(53);
// maxHeap.insert(12);
// maxHeap.insert(37);

// console.log(maxHeap.peekAtMax()); // 53
