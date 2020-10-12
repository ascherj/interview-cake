function sortScores(unorderedScores, highestPossibleScore) {
  /*
  Input
    {number[]} unorderedScores
    {number} highestPossibleScore
  Output
    {number[]} - sorted array of scores in descending order
  Contraints
    Runtime must be less than O(n lg n)
  Examples/edge cases
    Input
      unsortedScores: [37, 89, 41, 65, 91, 53]
      highestPossibleScore: 100
    Output
      [91, 89, 65, 53, 41, 37]
    
  initialize new array to store result
  initialize new array to store counts
  for each element in array
    use current element as index to increment in new array
  for each element in new array (start at end and decrement i)
    while element is > 0
      push element's index into result
  return result
  */

  const result = [];
  const counts = new Array(highestPossibleScore + 1);

  unorderedScores.forEach((elem) => {
    const currentCount = counts[elem];
    counts[elem] = currentCount ? currentCount + 1 : 1;
  });

  for (let score = counts.length - 1; score >= 0; score--) {
    let count = counts[score];

    while (count > 0) {
      result.push(score);
      count--;
    }
  }

  return result;
}

// BONUS
//  Optimize for space instead of time
//  Can the array be sorted in place? Effect on time/space complexity?

export default function () {
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
