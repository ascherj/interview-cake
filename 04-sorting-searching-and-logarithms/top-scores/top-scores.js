/*
  Input
    {number[]} unorderedScores - array of unsorted scores each of which is <= highestPossibleScore
    {number} highestPossibleScore - highest possible score attainable
  Output
    {number[]} array of scores sorted in descending order
  Constraints
    sort in less than O(n lg n) time
  Examples
    const unsortedScores = [37, 89, 41, 65, 91, 53];
    const HIGHEST_POSSIBLE_SCORE = 100;
    sortScores(unsortedScores, HIGHEST_POSSIBLE_SCORE); // [91, 89, 65, 53, 41, 37]
    
  initialize result array
  initialize count array with size of highestPossibleScore + 1
  walk through unorderedScores and tally count of each score treating each score as the array index
  for each index i in count array starting at the end
    if index has value > 0
      while value > 0
        push i into result
        decrement value
  return result
  
  COMPLEXITY
    time: O(n)
    space: O(n)
*/
function sortScores(unorderedScores, highestPossibleScore) {
  const result = [];
  const count = [];
  for (let i = 0; i < unorderedScores.length; i++) {
    const currentScore = unorderedScores[i];
    const currentCount = count[currentScore];
    count[currentScore] = currentCount ? currentCount + 1 : 1;
  }
  
  for (let i = count.length - 1; i >= 0; i--) {
    let currentCount = count[i];
    if (currentCount) {
      while (currentCount > 0) {
        result.push(i);
        currentCount--;
      }
    }
  }
  
  return result;
}

// BONUS
//  Optimize for space?
//  Sort array in-place? Effect on time and space complexity?


export default function() {
  // Tests

  let desc = 'no scores';
  let actual = sortScores([], 100);
  let expected = [];
  assertEqual(JSON.stringify(actual), JSON.stringify(expected), desc);

  desc = 'one score';
  actual = sortScores([55], 100);
  expected = [55];
  assertEqual(JSON.stringify(actual), JSON.stringify(expected), desc);

  desc = 'two scores';
  actual = sortScores([30, 60], 100);
  expected = [60, 30];
  assertEqual(JSON.stringify(actual), JSON.stringify(expected), desc);

  desc = 'many scores';
  actual = sortScores([37, 89, 41, 65, 91, 53], 100);
  expected = [91, 89, 65, 53, 41, 37];
  assertEqual(JSON.stringify(actual), JSON.stringify(expected), desc);

  desc = 'repeated scores';
  actual = sortScores([20, 10, 30, 30, 10, 20], 100);
  expected = [30, 30, 20, 20, 10, 10];
  assertEqual(JSON.stringify(actual), JSON.stringify(expected), desc);

  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }
}
