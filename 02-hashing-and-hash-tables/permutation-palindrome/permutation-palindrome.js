function hasPalindromePermutation(theString) {
  /*
  Input:
    {string} theString - The string to check for a palindrome permutation
  Output:
    {boolean} - Does the input string contain a palindrome permutation?
  Constraints:
  Examples:
    "civic" -> true
    "ivicc" -> true
    "civil" -> false
    "livci" -> false
  Edge cases:
    empty string -> true
    one character -> true
    
  A string has a permutation palindrome if all but one of its characters have even counts.
  An odd-length palindrome will have one odd-length character count.
    "racecar" -> 'e' has odd-length count
    {
      r: 2,
      a: 2,
      c: 2,
      e: 1
    }
    
  for each character of input string
    tally character count
  if number of odd-length character counts is > 1
    return false
  return true
  */
  
  // OBJECT-BASED SOLUTION
  // const charCounts = {};
  
  // theString.split('').forEach(char => {
  //   const currentCount = charCounts[char];
  //   charCounts[char] = currentCount ? charCounts[char] + 1 : 1;
  // });
  
  // const charCountValues = Object.values(charCounts);
  // let seenOdd = false;
  // for (let i = 0; i < charCountValues.length; i++) {
  //   const isOdd = charCountValues[i] % 2 !== 0;
  //   if (isOdd) {
  //     if (seenOdd) {
  //       return false;
  //     }
  //     seenOdd = true;
  //   }
  // }
  // return true;
  
  // SET-BASED SOLUTION
  const oddCounts = new Set();
  theString.split('').forEach(char => oddCounts.has(char) ? oddCounts.delete(char) : oddCounts.add(char));
  return oddCounts.size <= 1;
  
  // COMPLEXITY ANALYSIS
  //  Time - O(n)
  //  Space - O(k) where k is the number of possible characters to be added to the set
}

// Tests

let desc = 'permutation with odd number of chars';
assertEqual(hasPalindromePermutation('aabcbcd'), true, desc);

desc = 'permutation with even number of chars';
assertEqual(hasPalindromePermutation('aabccbdd'), true, desc);

desc = 'no permutation with odd number of chars';
assertEqual(hasPalindromePermutation('aabcd'), false, desc);

desc = 'no permutation with even number of chars';
assertEqual(hasPalindromePermutation('aabbcd'), false, desc);

desc = 'empty string';
assertEqual(hasPalindromePermutation(''), true, desc);

desc = 'one character string ';
assertEqual(hasPalindromePermutation('a'), true, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}