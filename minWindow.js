/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
//O(m + n)

function createSmallerStringMap(smallStr) {
  const map = {};

  for (let i = 0; i < smallStr.length; i++) {
    if (!map[smallStr[i]]) {
      map[smallStr] = 1;
    } else {
      map[smallStr] = map[smallStr] + 1;
    }
  }

  return map;
}

var minWindow = function (bigStr, smallStr) {
  if (smallStr.length > bigStr.length) {
    return "";
  }

  if (bigStr === smallStr) return bigStr;

  const smMap = createSmallerStringMap(smallStr);
  let res =""
  let left = 0
  let right = 0

  while(right < bigStr.length)

  for (let i = 0; i < bigStr.length; i++) {
    const char = bigStr[i];
  
    if (smMap[char]) {
        smMap[char] > 1 ? (smMap[char] = smMap[char] -1) : 
    }else {


    }
  }
};

let s = "ADOBECODEBANC";
let t = "ABC";
minWindow(s, t);
