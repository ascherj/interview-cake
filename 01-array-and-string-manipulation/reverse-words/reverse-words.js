function reverseWords(message) {
  /*
  // I: string[] of individual chars
  // O: string[] with words of input array reversed
  // C: reverse in place
  // E:
    // Input: ['c', 'a', 'k', 'e', ' ', 's', 't', 'e', 'a', 'l']
    // Output: ['s', 't', 'e', 'a', 'l', ' ', 'c', 'a', 'k', 'e']
    
  // reverse all chars
  // reverse all chars of words
  */

  function reverseChars(message, leftIndex, rightIndex) {
    while (leftIndex < rightIndex) {
      const temp = message[leftIndex];
      message[leftIndex] = message[rightIndex];
      message[rightIndex] = temp;
      leftIndex++;
      rightIndex--;
    }
  }

  // reverse all chars initially - O(n) time
  reverseChars(message, 0, message.length - 1);

  // reverse all chars of words - O(n) time
  let leftIndex = 0;
  for (let i = 0; i < message.length; i++) {
    if (message[i] === ' ') {
      // reverse previous word
      reverseChars(message, leftIndex, i - 1);
      leftIndex = i + 1;
    }

    // if at end of message
    if (i === message.length - 1) {
      // reverse last word
      reverseChars(message, leftIndex, i);
    }
  }
}

// Time complexity - O(n)
// Space complexity - O(1)

// BONUS: Handle punctuation?

export default function () {
  // Tests

  let desc = 'one word';
  let input = 'vault'.split('');
  reverseWords(input);
  let actual = input.join('');
  let expected = 'vault';
  assertEqual(actual, expected, desc);

  desc = 'two words';
  input = 'thief cake'.split('');
  reverseWords(input);
  actual = input.join('');
  expected = 'cake thief';
  assertEqual(actual, expected, desc);

  desc = 'three words';
  input = 'one another get'.split('');
  reverseWords(input);
  actual = input.join('');
  expected = 'get another one';
  assertEqual(actual, expected, desc);

  desc = 'multiple words same length';
  input = 'rat the ate cat the'.split('');
  reverseWords(input);
  actual = input.join('');
  expected = 'the cat ate the rat';
  assertEqual(actual, expected, desc);

  desc = 'multiple words different lengths';
  input = 'yummy is cake bundt chocolate'.split('');
  reverseWords(input);
  actual = input.join('');
  expected = 'chocolate bundt cake is yummy';
  assertEqual(actual, expected, desc);

  desc = 'empty string';
  input = ''.split('');
  reverseWords(input);
  actual = input.join('');
  expected = '';
  assertEqual(actual, expected, desc);

  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }
}
