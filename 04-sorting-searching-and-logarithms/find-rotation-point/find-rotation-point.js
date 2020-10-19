/*
  Input
    {string[]} words - array of words
  Output
    number - index of the "rotation point" in the array
  Constraints/considerations
    time - O(lg n)
    assume all words are lowercase
  Examples
    Input
      ['plum', 'radish', 'apple', 'grape', 'orange']
    Output
      4
  
  initialize left
  initialize right
  
  while there exists at least one element between left and right
    find mid index
    if mid value < left value
      (rotation point is to the left)
      right = mid index
    else if mid value > right value
      (rotation point is to the right)
      left = mid index
      
*/
function findRotationPoint(words) {
  let left = 0;
  let right = words.length - 1;
  
  while (left + 1 < right) {
    const distance = right - left;
    const halfDistance = Math.floor(distance / 2);
    const guessIndex = left + halfDistance;
    
    if (words[guessIndex] < words[left]) {
      right = guessIndex;
    } else if (words[guessIndex] > words[right]) {
      left = guessIndex;
    }
  }
  // right index is the rotation point
  return right;
}

// COMPLEXITY
//  Time: O(lg n)
//  Space: O(1)

// BONUS
//  What index will be returned if array is not rotated? How can we modify the function to
//  return 0 for an unrotated array?


// Tests

export default function() {
  let desc = 'small array';
  let actual = findRotationPoint(['cape', 'cake']);
  let expected = 1;
  assertEquals(actual, expected, desc);
  
  desc = 'medium array';
  actual = findRotationPoint(['grape', 'orange', 'plum', 'radish', 'apple']);
  expected = 4;
  assertEquals(actual, expected, desc);
  
  desc = 'large array';
  actual = findRotationPoint(['ptolemaic', 'retrograde', 'supplant',
    'undulate', 'xenoepist', 'asymptote',
    'babka', 'banoffee', 'engender',
    'karpatka', 'othellolagkage']);
  expected = 5;
  assertEquals(actual, expected, desc);
  
  function assertEquals(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }
}
