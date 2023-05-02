function lengthOfLongestSubstring(s) {
  let maxLength = 0; // The length of the longest substring without repeating characters
  let windowStart = 0; // The start index of the current sliding window
  let currentPos = 0; // The current position in the input string

  const charSet = new Set(); // A set to store unique characters within the sliding window

  // Iterate through the input string
  while (currentPos < s.length) {
    // Check if the character at the current position is in the set
    if (charSet.has(s[currentPos])) {
      // If yes, remove the character at the window start from the set
      charSet.delete(s[windowStart]);
      // Move the window start to the right
      windowStart++;
    } else {
      // If no, add the character at the current position to the set
      charSet.add(s[currentPos]);
      // Move the current position to the right
      currentPos++;
      // Update maxLength with the maximum length of unique characters found so far
      maxLength = Math.max(maxLength, charSet.size);
    }
  }

  // Return the length of the longest substring without repeating characters
  return maxLength;
}

function containsNearbyDuplicate(nums, k) {
  const set = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true;
    }
    set.add(nums[i]);
    if (set.size > k) {
      set.delete(nums[i - k]);
    }
  }

  return false;
}
