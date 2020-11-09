/*
  Input
    {string} str - The string to derive permutation from
  Output
    {string Set()} - A set housing the string permutations
  Considerations
    Disregard time & space complexity
  Examples
    Input: abc
    Output: new Set(['abc', 'acb', 'bac', 'bca', 'cab', 'cba'])
*/
function getPermutations(string) {
  const permutations = new Set();

  function swap(str, i, j) {
    let temp;
    const arr = str.split('');
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr.join('');
  }

  function permute(str, left, right) {
    if (left >= right) {
      permutations.add(str);
    } else {
      for (let i = left; i <= right; i++) {
        const swapped = swap(str, left, i);
        permute(swapped, left + 1, right);
      }
    }
  }

  permute(string, 0, string.length - 1);

  return permutations;
}

export default function () {
  // Tests

  let desc = 'empty string';
  let input = '';
  let actual = getPermutations(input);
  let expected = new Set(['']);
  assert(isSetsEqual(actual, expected), desc);

  desc = 'one character string';
  input = 'a';
  actual = getPermutations(input);
  expected = new Set(['a']);
  assert(isSetsEqual(actual, expected), desc);

  desc = 'two character string';
  input = 'ab';
  actual = getPermutations(input);
  expected = new Set(['ab', 'ba']);
  assert(isSetsEqual(actual, expected), desc);

  desc = 'three character string';
  input = 'abc';
  actual = getPermutations(input);
  expected = new Set(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
  assert(isSetsEqual(actual, expected), desc);

  function isSetsEqual(as, bs) {
    if (as.size !== bs.size) {
      return false;
    }
    for (let a of as) {
      if (!bs.has(a)) return false;
    }
    return true;
  }

  function assert(condition, desc) {
    if (condition) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL`);
    }
  }
}
