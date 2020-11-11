/*
Input
  {number} n - The number to use to compute the nth Fibonacci number
Output
  {number} The resulting nth Fibonacci number
Considerations
  Use recursion
Examples
  fib(0); // => 0
  fib(1); // => 1
  fib(2); // => 1
  fib(3); // => 2
  fib(4); // => 3
  ...
  
RECURSIVE APPROACH W/O MEMOIZATION
  BASE CASE
  if n === 1 || n === 0
    return n
  
  RECURSIVE CASE
  return fib(n - 1) + fib(n - 2)
*/
// function fib(n) {
//   if (n < 0) throw new Error('n cannot be negative!');
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }

/*

RECURSIVE APPROACH W/ MEMOIZATION
  initialize memo object to store already-computed values
  
  if n <= 1
    return n
    
  if memo has already-computed result
    return result
    
  not in memo, compute result via recursion
  save result in memo
  return result
  
Complexity
  Time - O(n)
  Space - O(2n) -> O(n)
*/
// const memo = {};
// function fib(n) {
//   if (n < 0) throw new Error('n cannot be negative!');
//   if (n <= 1) return n;
//   if (memo.hasOwnProperty(n)) return memo[n];
//   const result = fib(n - 1) + fib(n - 2);
//   memo[n] = result;
//   return result;
// }

/*

ITERATIVE BOTTOM-UP APPROACH W/ MEMOIZATION

Complexity
  Time - O(n)
  Space - O(1)
*/
function fib(n) {
  if (n < 0) throw new Error('n cannot be negative!');
  if (n <= 1) return n;
  
  let prevPrev = 0; // 0th fibonacci
  let prev = 1;     // 1st fibonacci
  let current;
  for (let i = 1; i < n; i++) {
    current = prevPrev + prev;
    prevPrev = prev;
    prev = current;
  }
  
  return current;
}

export default function() {
  // Tests
  
  let desc = 'zeroth fibonacci';
  let actual = fib(0);
  let expected = 0;
  assertEqual(actual, expected, desc);
  
  desc = 'first fibonacci';
  actual = fib(1);
  expected = 1;
  assertEqual(actual, expected, desc);
  
  desc = 'second fibonacci';
  actual = fib(2);
  expected = 1;
  assertEqual(actual, expected, desc);
  
  desc = 'third fibonacci';
  actual = fib(3);
  expected = 2;
  assertEqual(actual, expected, desc);
  
  desc = 'fifth fibonacci';
  actual = fib(5);
  expected = 5;
  assertEqual(actual, expected, desc);
  
  desc = 'tenth fibonacci';
  actual = fib(10);
  expected = 55;
  assertEqual(actual, expected, desc);
  
  desc = 'negative fibonacci';
  const negativeFib = () => (fib(-1));
  assertThrowsError(negativeFib, desc);
  
  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`)
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
