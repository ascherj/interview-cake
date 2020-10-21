/*
  Input
    {number[]} numbers - Array of numbers 1..n where n = array.length - 1
  Output
    {number} - Number that appears more than once in array
  Constraints/Considerations
    optimize for space
  Examples
    [1, 2, 2, 3] -> 2
*/
function findRepeat(numbers) {
  /*
  SIMPLE SOLUTION (not optimized for space)
  
  initialize set
  for each number in numbers
    if number is in set
      return number
    else
      add number to set
  throw exception (no duplicates exist)
  
  COMPLEXITY
    time: O(n)
    space: O(n)
  */
  // let numbersSeen = new Set();
  
  // for (let i = 0; i < numbers.length; i++) {
  //   const current = numbers[i];
  //   if (numbersSeen.has(current)) {
  //     return current;
  //   } else {
  //     numbersSeen.add(current);
  //   }
  // }
  // throw new Error('No duplicate numbers exist!');
  

  /*
  BRUTE-FORCE SOLUTION (check if each number in range 1..n appears twice)
  COMPLEXITY
    time: O(n^2)
    space: O(1)
  */
  // for (let needle = 1; needle < numbers.length; needle++) {
  //   let hasBeenSeen = false;
  //   for (let i = 0; i < numbers.length; i++) {
  //     if (needle === numbers[i]) {
  //       if (hasBeenSeen) {
  //         return numbers[i];
  //       } else {
  //         hasBeenSeen = true;
  //       }
  //     }
  //   }
  // }
  // throw new Error('No duplicates exist!');
  
  /*
  SPACE-OPTIMIZED SOLUTION
  COMPLEXITY
    time: O(n lg n)
    space: O(1)
  */
  if (numbers.length === 2 && numbers[0] === numbers[1]) {
    return numbers[0];
  }
  
  numbers.sort((a, b) => a - b);
  let left = 0;
  let right = numbers.length - 1;
  let previous;
  
  while (left < right) {
    const distance = right - left;
    const halfDistance = Math.floor(distance / 2);
    const midIndex = left + halfDistance;
    const midValue = numbers[midIndex];
    
    if (previous === midValue) {
      return midValue;
    }
    
    if (midValue < midIndex + 1) {
      right = midIndex;
    } else {
      left = midIndex;
    }
    
    previous = midValue;
  }
  
  // TODO: Implement solution that does not modify input
  // using modified binary search dividing the range of
  // possible duplicates in half each iteration
}


export default function() {
  // Tests
  
  let desc = 'just the repeated number';
  let actual = findRepeat([1, 1]);
  let expected = 1;
  assertEqual(actual, expected, desc);
  
  desc = 'short array';
  actual = findRepeat([1, 2, 3, 2]);
  expected = 2;
  assertEqual(actual, expected, desc);
  
  desc = 'medium array';
  actual = findRepeat([1, 2, 5, 5, 5, 5]); 
  expected = 5;
  assertEqual(actual, expected, desc);
  
  desc = 'long array';
  actual = findRepeat([4, 1, 4, 8, 3, 2, 7, 6, 5]);
  expected = 4;
  assertEqual(actual, expected, desc);
  
  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }
}