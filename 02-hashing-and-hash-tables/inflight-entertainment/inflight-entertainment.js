function canTwoMoviesFillFlight(movieLengths, flightLength) {

  /*
  Input:
    {number[]} movieLengths - Array of integers representing movie lengths
    {number} flightLength - The total length of the flight
  Output:
    {boolean} Are there two numbers in movieLengths whose sum equals flightLength?
  Contraints:
    Assume user will watch exactly two movies
    Both movies must not be the same (i.e. same index in array; same lengths are OK)
    Optimize for runtime over memory
  Example:
    Input:
      movieLengths: [1, 2, 3, 4]
      flightLength: 6
    Output:
      true -> 2 + 4 = 6
  Edge cases:
    movieLengths.length < 2
      return false
      
  initialize object to keep track of seen movieLengths
  loop over movieLengths
    if movie of length (currentMovieLength - flightLength) has been seen
      return true
    add currentMovieLength to object
  return false
  */
  
  // OBJECT-BASED SOLUTION
  const seenMovieLengths = {};
  
  for (let i = 0; i < movieLengths.length; i++) {
    const currentMovieLength = movieLengths[i];
    if (seenMovieLengths.hasOwnProperty(flightLength - currentMovieLength)) {
      return true;
    }
    seenMovieLengths[currentMovieLength] = true;
  }

  return false;
  
  // Complexity analysis:
  //  Time - O(n)
  //  Space - O(n)
  
  // BONUS:
  //  - Handle approximate movie length summations (e.g. within 20 minutes of landing)
  //  - Handle filling of flight length with any number of movies (not just 2)
  //  - What if movieLengths was sorted? (space and/or time savings?)
  
  // SET-BASED SOLUTION
  // const seenMovieLengths = new Set();
  // for (let i = 0; i < movieLengths.length; i++) {
  //   const currentMovieLength = movieLengths[i];
  //   if (seenMovieLengths.has(flightLength - currentMovieLength)) {
  //     return true;
  //   }
  //   seenMovieLengths.add(currentMovieLength);
  // }
  // return false;
}




// Tests

let desc = 'short flight';
let actual = canTwoMoviesFillFlight([2, 4], 1);
let expected = false;
assertEquals(actual, expected, desc);

desc = 'long flight';
actual = canTwoMoviesFillFlight([2, 4], 6);
expected = true;
assertEquals(actual, expected, desc);

desc = 'one movie half flight length';
actual = canTwoMoviesFillFlight([3, 8], 6);
expected = false;
assertEquals(actual, expected, desc);

desc = 'two movies half flight length';
actual = canTwoMoviesFillFlight([3, 8, 3], 6);
expected = true;
assertEquals(actual, expected, desc);

desc = 'lots of possible pairs';
actual = canTwoMoviesFillFlight([1, 2, 3, 4, 5, 6], 7);
expected = true;
assertEquals(actual, expected, desc);

desc = 'not using first movie';
actual = canTwoMoviesFillFlight([4, 3, 2], 5);
expected = true;
assertEquals(actual, expected, desc);

desc = 'only one movie';
actual = canTwoMoviesFillFlight([6], 6);
expected = false;
assertEquals(actual, expected, desc);

desc = 'no movies';
actual = canTwoMoviesFillFlight([], 2);
expected = false;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}