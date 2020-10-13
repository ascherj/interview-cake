function highestProductOf3(arrayOfInts) {
  /*
  Input
    {number[]} arrayOfInts
  Output
    {number} highest product of 3 of the integers
  Constraints/Considerations
    time: O(n)
    space: O(1)
    negative numbers?
  Examples
    Input
      [1, 2, 3, 4]
    Output
      2 * 3 * 4 = 24
  Edge cases
    less than 3 ints in input
    
  BRUTE-FORCE SOLUTION (check every combination of 3)
  Complexity
    Time: O(n^3)
    Space: O(1)
  
  for each int x
    for each int y
      for each int z
        find product xyz
        if xyz > highestProduct
          highestProduct = xyz
  return highestProduct
  */
  // if (arrayOfInts.length < 3) {
  //   throw new Error('Array length must be at least 3!');
  // }

  // let highestProduct = -Infinity;
  // for (let x = 0; x < arrayOfInts.length - 2; x++) {
  //   for (let y = x + 1; y < arrayOfInts.length - 1; y++) {
  //     for (let z = y + 1; z < arrayOfInts.length; z++) {
  //       const xyz = arrayOfInts[x] * arrayOfInts[y] * arrayOfInts[z];
  //       highestProduct = Math.max(highestProduct, xyz);
  //     }
  //   }
  // }
  // return highestProduct;

  // GREEDY SOLUTION
  // Complexity
  //  Time: O(n)
  //  Space: O(1)
  if (arrayOfInts.length < 3) {
    throw new Error('Array length must be at least 3!');
  }

  let highestProductOf3 = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];
  let highestProductOf2 = arrayOfInts[0] * arrayOfInts[1];
  let lowestProductOf2 = arrayOfInts[0] * arrayOfInts[1];
  let highest = Math.max(arrayOfInts[0], arrayOfInts[1]);
  let lowest = Math.min(arrayOfInts[0], arrayOfInts[1]);

  for (let i = 2; i < arrayOfInts.length; i++) {
    const currentInt = arrayOfInts[i];

    highestProductOf3 = Math.max(
      highestProductOf3,
      highestProductOf2 * currentInt,
      lowestProductOf2 * currentInt
    );
    highestProductOf2 = Math.max(
      highestProductOf2,
      highest * currentInt,
      lowest * currentInt
    );
    lowestProductOf2 = Math.min(
      lowestProductOf2,
      highest * currentInt,
      lowest * currentInt
    );
    highest = Math.max(highest, currentInt);
    lowest = Math.min(lowest, currentInt);
  }

  return highestProductOf3;
}

export default function () {
  // Tests

  let desc = 'short array';
  let actual = highestProductOf3([1, 2, 3, 4]);
  let expected = 24;
  assertEqual(actual, expected, desc);

  desc = 'longer array';
  actual = highestProductOf3([6, 1, 3, 5, 7, 8, 2]);
  expected = 336;
  assertEqual(actual, expected, desc);

  desc = 'array has one negative';
  actual = highestProductOf3([-5, 4, 8, 2, 3]);
  expected = 96;
  assertEqual(actual, expected, desc);

  desc = 'array has two negatives';
  actual = highestProductOf3([-10, 1, 3, 2, -10]);
  expected = 300;
  assertEqual(actual, expected, desc);

  desc = 'array is all negatives';
  actual = highestProductOf3([-5, -1, -3, -2]);
  expected = -6;
  assertEqual(actual, expected, desc);

  desc = 'error with empty array';
  const emptyArray = () => highestProductOf3([]);
  assertThrowsError(emptyArray, desc);

  desc = 'error with one number';
  const oneNumber = () => highestProductOf3([1]);
  assertThrowsError(oneNumber, desc);

  desc = 'error with two numbers';
  const twoNumber = () => highestProductOf3([1, 1]);
  assertThrowsError(twoNumber, desc);

  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }

  function assertThrowsError(func, desc) {
    try {
      func();
      console.log(`${desc} ... FAIL`);
    } catch (e) {
      console.log(`${desc} ... PASS`);
    }
  }
}
