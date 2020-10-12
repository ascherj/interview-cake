function mergeArrays(myArray, alicesArray) {
  /*
  // I: two number[] representing list of orders
  // O: one number[] sorted in ascending order
  // C: n/a
  // E:
    // Input arrays:
      // [3, 4, 6, 10, 11, 15]
      // [1, 5, 8, 12, 14, 19]
    // Output array:
      // [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
      
  // initialize result
  // while both arrays are not empty
    // if only one array has elements
      // shift element at index 0
      // push into result
    // compare elements at index 0 of both arrays
    // shift lesser element
    // push into result
  // return result
  */
  const mergedArray = [];

  while (myArray.length || alicesArray.length) {
    // first array empty
    if (!myArray.length) {
      mergedArray.push(alicesArray.shift());
      // second array empty
    } else if (!alicesArray.length) {
      mergedArray.push(myArray.shift());
      // neither array empty
    } else {
      const elemToPush =
        myArray[0] <= alicesArray[0] ? myArray.shift() : alicesArray.shift();
      mergedArray.push(elemToPush);
    }
  }

  return mergedArray;
}

// Time complexity: O(n)
// Space complexity: O(n)

// BONUS: Handle several sorted arrays (input: array of sorted arrays)
//        Do we need to allocate a new array for the merged output?

export default function () {
  // Tests

  let desc = 'both arrays are empty';
  let actual = mergeArrays([], []);
  let expected = [];
  assertDeepEqual(actual, expected, desc);

  desc = 'first array is empty';
  actual = mergeArrays([], [1, 2, 3]);
  expected = [1, 2, 3];
  assertDeepEqual(actual, expected, desc);

  desc = 'second array is empty';
  actual = mergeArrays([5, 6, 7], []);
  expected = [5, 6, 7];
  assertDeepEqual(actual, expected, desc);

  desc = 'both arrays have some numbers';
  actual = mergeArrays([2, 4, 6], [1, 3, 7]);
  expected = [1, 2, 3, 4, 6, 7];
  assertDeepEqual(actual, expected, desc);

  desc = 'arrays are different lengths';
  actual = mergeArrays([2, 4, 6, 8], [1, 7]);
  expected = [1, 2, 4, 6, 7, 8];
  assertDeepEqual(actual, expected, desc);

  function assertDeepEqual(a, b, desc) {
    const aStr = JSON.stringify(a);
    const bStr = JSON.stringify(b);
    if (aStr !== bStr) {
      console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
    } else {
      console.log(`${desc} ... PASS`);
    }
  }
}
