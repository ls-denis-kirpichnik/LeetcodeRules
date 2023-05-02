// Example: Given a smaller strings and a bigger string b, design an algorithm to find all permutations of the
// shorter string within the longer one. Print the location of each permutation.

function findPermutations(s: string, b: string): any {
  const sMap = new Map();
  for (let i = 0; i < s.length; i++) {
    const element = s[i];
    sMap.set(element, (sMap.get(s[i]) || 0) + 1);
  }

  const result: any[] = [];
  const slWindowMap = new Map();
  const windowSize = s.length;

  for (let i = 0; i < b.length; i++) {
    const element = b[i];

    slWindowMap.set(element, (slWindowMap.get(b[i]) || 0) + 1);

    if (i >= windowSize) {
      const prevChar = b[i - windowSize];

      // update map
      if (slWindowMap.get(prevChar) > 1) {
        slWindowMap.set(prevChar, slWindowMap.get(prevChar) - 1);
      } else {
        slWindowMap.delete(prevChar);
      }
    }

    // compare maps
    if (areMapsEqual(sMap, slWindowMap)) {
      result.push(i - windowSize + 1);
    }
  }

  return result;
}

function areMapsEqual(map1: Map<any, any>, map2: Map<any, any>) {
  if (map1.size !== map2.size) return false;

  for (const [key, value] of map1) {
    if (!map2.get(key) || map2.get(key) !== value) {
      return false;
    }
  }

  return true;
}

// Test the function
let s = "ab";
let b = "abbcabba";
let result = findPermutations(s, b);
console.log("result", result);

function findPermutations1(s: string, b: string): number[] {
  const sArray = new Array(128).fill(0);
  for (let i = 0; i < s.length; i++) {
    sArray[s.charCodeAt(i)]++;
  }

  const result: number[] = [];
  const windowArray = new Array(128).fill(0);
  const windowSize = s.length;

  for (let i = 0; i < b.length; i++) {
    windowArray[b.charCodeAt(i)]++;

    if (i >= windowSize) {
      windowArray[b.charCodeAt(i - windowSize)]--;
    }

    if (arraysEqual(sArray, windowArray)) {
      result.push(i - windowSize + 1);
    }
  }

  return result;
}

function arraysEqual(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

// Test the function
let smallerString = "ab";
let biggerString = "abbcabba";
let res = findPermutations1(smallerString, biggerString);
console.log("result", res);
