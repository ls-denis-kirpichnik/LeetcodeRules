function getMax(arr) {
  let maxSum = -Infinity;
  let currSum = 0;
  for (let i = 0; i < arr.length; i++) {
    currSum += arr[i];
    if (currSum > maxSum) maxSum = currSum;

    if (currSum < 0) currSum = 0;
  }
  return maxSum;
}

console.log(getMax([-1, -2, -3]));
