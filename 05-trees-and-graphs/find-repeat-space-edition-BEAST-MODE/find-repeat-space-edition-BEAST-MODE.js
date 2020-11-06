function findDuplicate(intArray) {
  // walk n steps to find cycleStartVal
  const n = intArray.length - 1;
  let currentPosition = n + 1;
  for (let i = 0; i < n; i++) {
    currentPosition = intArray[currentPosition - 1];
  }

  // find length of cycle
  const cycleStartVal = currentPosition;
  let cycleCurrentVal = intArray[cycleStartVal - 1];
  let cycleLength = 1;
  while (cycleCurrentVal !== cycleStartVal) {
    cycleCurrentVal = intArray[cycleCurrentVal - 1];
    cycleLength++;
  }

  // find first node in cycle

  // firstPointer starts at end of array
  let firstPointer = intArray[n];

  // secondPointer is cycleLength steps ahead of firstPointer
  let secondPointer = intArray[n];
  for (let i = 0; i < cycleLength; i++) {
    secondPointer = intArray[secondPointer - 1];
  }

  // advance firstPointer and secondPointer until they are the same
  while (firstPointer !== secondPointer) {
    firstPointer = intArray[firstPointer - 1];
    secondPointer = intArray[secondPointer - 1];
  }

  // firstPointer and secondPointer are the same, so we return either
  return firstPointer;
}

export default function () {
  // Tests

  let desc = 'just the repeated number';
  let actual = findDuplicate([1, 1]);
  let expected = 1;
  assertEqual(actual, expected, desc);

  desc = 'short array';
  actual = findDuplicate([1, 2, 3, 2]);
  expected = 2;
  assertEqual(actual, expected, desc);

  desc = 'medium array';
  actual = findDuplicate([1, 2, 5, 5, 5, 5]);
  expected = 5;
  assertEqual(actual, expected, desc);

  desc = 'long array';
  actual = findDuplicate([4, 1, 4, 8, 3, 2, 7, 6, 5]);
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
