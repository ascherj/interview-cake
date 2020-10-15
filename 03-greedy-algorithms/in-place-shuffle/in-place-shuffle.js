function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function obtainAllPossibleIndexPermutations(array) {
  const permutations = [];
  const usedNums = [];
  
  function permute(input) {
    for (let i = 0; i < input.length; i++) {
      let num = input.splice(i, 1)[0];
      usedNums.push(num);
      if (input.length === 0) {
        permutations.push(usedNums.slice());
      }
      permute(input);
      input.splice(i, 0, num);
      usedNums.pop();
    }
    return permutations;
  }
  
  return permute(Array.from(Array(array.length).keys()));
}

function shuffle(array) {
  /*
  Input
    {number[]} array - Array of numbers pre-in-place-shuffle
  Output
    {number[]} array - Array of numbers post-in-place-shuffle
  Constraints/considerations
    Shuffle must be uniform
  Examples
    [1, 2, 3, 4, 5] -> [2, 5, 4, 1, 3]
    
  for each element in array
    store element at current index in temp var
    get random index
    set element at current index to element at random index
    set element at random index to temp
  */
  
  // BELOW SOLUTION DOES NOT GIVE UNIFORM RANDOM DISTRIBUTION
  // for (let i = 0; i < array.length; i++) {
  //   const temp = array[i];
  //   const randomIndex = getRandom(0, array.length - 1);
  //   array[i] = array[randomIndex];
  //   array[randomIndex] = temp;
  // }
  
  // REVISED SOLUTION
  /*
  total number of possible outcomes is array.length!
  e.g. [1, 2, 3, 4] -> length = 4 -> 4! = 24 possible outcomes
  0123, 0132, 0213, 0231, 0312, 0321
  1023, 1032, 1203, 1230, 1302, 1320
  2013, 2031, 2103, 2130, 2301, 2310
  3012, 3021, 3102, 3120, 3201, 3210
  
  obtain set of all possible permutations of indices (total number = array.length!)
  get a random permutation from set of possible permutations
  for each index i in input array
    store elem at i in temp var
    get element j at index i in randomly-selected permutation
    set element at index i to element at index j
    set element at index j to temp
  */
  const permutations = obtainAllPossibleIndexPermutations(array);
  const randomPermutationsIndex = getRandom(0, permutations.length - 1);
  const randomPermutation = permutations[randomPermutationsIndex];
  
  for (let i = 0; i < array.length; i++) {
    const temp = array[i];
    const randomIndex = randomPermutation[i];
    if (i !== randomIndex) {
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
  }
}


const sample = [1, 2, 3, 4, 5];
console.log('Initial array: ', sample);
shuffle(sample);
console.log('Shuffled array: ', sample);