function reverse(arrayOfChars) {
  // I: string[] of chars
  // O: string[] w/ chars reversed
  // C: reverse in place
  // E:
    // ['a', 'b', 'c', 'd', 'e'] => ['e', 'd', 'c', 'b', 'a']
    
  // find middle index of array (Math.floor(arrayOfChars.length / 2))
  // loop up to mid
    // store current char in temp var
    // get corresponding char on other side of mid
    // set current index to other char
    // set other char to current char
  // return array
  
  const mid = Math.floor(arrayOfChars.length / 2);
  
  for (let i = 0; i < mid; i++) {
    const temp = arrayOfChars[i];
    const opposite = arrayOfChars[arrayOfChars.length - 1 - i];
    arrayOfChars[i] = opposite;
    arrayOfChars[arrayOfChars.length - 1 - i] = temp;
  }
  
  return arrayOfChars;

  // Time complexity: O(n)
  // Space complexity: O(1);
}

// Tests

let desc = 'empty string';
let input = ''.split('');
reverse(input);
let actual = input.join('');
let expected = '';
assertEqual(actual, expected, desc);

desc = 'single character string';
input = 'A'.split('');
reverse(input);
actual = input.join('');
expected = 'A';
assertEqual(actual, expected, desc);

desc = 'longer string';
input = 'ABCDE'.split('');
reverse(input);
actual = input.join('');
expected = 'EDCBA';
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}