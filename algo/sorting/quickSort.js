// function swap(arr, i, j) {
//   const temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// }

// function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
//   if (left >= right) {
//     return;
//   }

//   const pivotIndex = Math.floor((left + right) / 2);
//   const pivot = arr[pivotIndex];

//   swap(arr, pivotIndex, right);

//   let i = left;
//   let j = right - 1;

//   while (i <= j) {
//     while (i <= j && arr[i] < pivot) {
//       i++;
//     }
//     while (i <= j && arr[j] > pivot) {
//       j--;
//     }
//     if (i <= j) {
//       swap(arr, i, j);
//       i++;
//       j--;
//     }
//   }

//   swap(arr, i, right);

//   quickSortInPlace(arr, left, i - 1);
//   quickSortInPlace(arr, i + 1, right);
// }

// const myArray = [3, 0, 2, 5, -1, 4, 1];
// quickSortInPlace(myArray);
// console.log(myArray);

////////// ITERATIVE

function partition(arr, low, high) {
  let temp;
  let pivot = arr[high];

  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller
    // than or equal to pivot
    if (arr[j] <= pivot) {
      i++;

      // swap arr[i] and arr[j]
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  // swap arr[i+1] and arr[high]
  // (or pivot)

  temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  return i + 1;
}

function quickSortIterative(arr, l, h) {
  let stack = new Array(h - l + 1);
  stack.fill(0);

  // initialize top of stack
  let top = -1;

  // push initial values of l and h to
  // stack
  stack[++top] = l;
  stack[++top] = h;
  //after init [0,7]

  // Keep popping from stack while
  // is not empty
  while (top >= 0) {
    // Pop h and l
    h = stack[top--];
    l = stack[top--];

    // Set pivot element at its
    // correct position in
    // sorted array
    let p = partition(arr, l, h);

    // If there are elements on
    // left side of pivot, then
    // push left side to stack
    if (p - 1 > l) {
      stack[++top] = l;
      stack[++top] = p - 1;
    }

    // If there are elements on
    // right side of pivot, then
    // push right side to stack
    if (p + 1 < h) {
      stack[++top] = p + 1;
      stack[++top] = h;
    }
  }
}

let arr = [4, 3, 5, 2, 1, 3, 2, 3];
let n = 8;

// Function calling
function profile(func) {
  return function (...args) {
    console.time(func.name);

    func(...args); // func.apply(this, arguments)

    console.timeEnd(func.name);
  };
}

const profiledFunc = profile(quickSortIterative);

profiledFunc(arr, 0, n - 1);

console.log(arr);
// This code is contributed by mukesh07.

function test(array) {
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return array;
}

const profilsedTest = profile(test);

profilsedTest([4, 3, 5, 2, 1, 3, 2, 3]);
