function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    let j;
    for (j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currentValue;
  }
  return arr;
}

function myInsertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    const currentValue = arr[i];

    let j;
    for (j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currentValue;
  }

  return arr;
}

// console.log(myInsertionSort([2, 1, 3, 7, 5]));

function mInsertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];

    let j;
    for (j = i - 1; j >= 0 && arr[j] > element; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = element;
  }
  return arr;
}

console.log(mInsertionSort([2, 1, 3, 7, 5]));
