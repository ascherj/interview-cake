class WordCloudData {
  constructor(inputString = '') {
    this.wordsToCounts = new Map();
    this.populateWordsToCounts(inputString);
  }
  
  isOnlyPunctuation(word) {
    return !word.split('').some(char => this.isAlphabetical(char));
  }
  
  isAlphabetical(char) {
    return char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 122;
  }

  isValidPunctuation(char) {
    const HYPHEN = 45;
    const APOS = 39;
    return char.charCodeAt(0) === HYPHEN || char.charCodeAt(0) === APOS;
  }

  isValidChar(char) {
    return this.isAlphabetical(char) || this.isValidPunctuation(char);
  }

  removeInvalidPunctuation(word) {
    return word
      .split('')
      .filter(char => this.isValidChar(char))
      .join('');
  }
  
  extractWordsFromInput(str) {
    const spacesRemoved = str.split(' ');
    const ellipsesRemoved = spacesRemoved.reduce((accum, current) => accum.concat(current.split('...')), []);
    const invalidPunctuationRemoved = ellipsesRemoved.map(word => this.removeInvalidPunctuation(word));
    const filteredWords = invalidPunctuationRemoved.filter(word => !this.isOnlyPunctuation(word));
    const desensitizedWords = filteredWords.map(word => word.split('').map(char => char.toLowerCase()).join(''));
    return desensitizedWords;
  }
  
  /*
  Input
    {string} inputString - The string from which to derive word counts
  Output
    {null} - function doesn't return anything, but instead has side-effect of populating this.wordsToCounts
  Constraints/considerations
    - Disregard capitalization ("Add" and "add" should both map to same value)
    - Assume input will only contain words and standard punctuation
  Examples/edge cases
    "Add milk and eggs, then add flour and sugar."
    {
      "Add": 2,
      "milk": 1,
      "and": 2,
      "eggs": 1,
      "then": 1,
      "flour": 1,
      "sugar": 1
    }
    
    split inputString into individual words
    filter out punctuation
    for each word
      if case-insensitive word exists in map
        increment value
      else
        add word to map (w/ original punctuation)
  */
  populateWordsToCounts(inputString) {
    const words = this.extractWordsFromInput(inputString);
    
    words.forEach(word => {
      const currentVal = this.wordsToCounts.get(word);
      this.wordsToCounts.set(word, currentVal ? currentVal + 1 : 1);
    });
  }

}


// Tests

// There are lots of valid solutions for this one. You
// might have to edit some of these tests if you made
// different design decisions in your solution.

// MY TESTS

let desc = 'removes punctuation from a word';
let actual = new WordCloudData().removeInvalidPunctuation('!t(e.s)+=ti,ng::');
let expected = 'testing';
assert(actual === expected, desc);

// INCLUDED TESTS

desc = 'simple sentence';
actual = new WordCloudData('I like cake').wordsToCounts;
expected = new Map([['i', 1], ['like', 1], ['cake', 1]]);
assert(isMapsEqual(actual, expected), desc);

desc = 'longer sentence';
actual = new WordCloudData('Chocolate cake for dinner and pound cake for dessert').wordsToCounts;
expected = new Map([['and', 1], ['pound', 1], ['for', 2], ['dessert', 1],
  ['chocolate', 1], ['dinner', 1], ['cake', 2]]);
assert(isMapsEqual(actual, expected), desc);

desc = 'punctuation';
actual = new WordCloudData('Strawberry short cake? Yum!').wordsToCounts;
expected = new Map([['cake', 1], ['strawberry', 1], ['short', 1], ['yum', 1]]);
assert(isMapsEqual(actual, expected), desc);

desc = 'hyphenated Words';
actual = new WordCloudData('Dessert - mille-feuille cake').wordsToCounts;
expected = new Map([['cake', 1], ['dessert', 1], ['mille-feuille', 1]]);
assert(isMapsEqual(actual, expected), desc);

desc = 'ellipses between words';
actual = new WordCloudData('Mmm...mmm...decisions...decisions').wordsToCounts;
expected = new Map([['mmm', 2], ['decisions', 2]]);
assert(isMapsEqual(actual, expected), desc);

desc = 'apostrophes';
actual = new WordCloudData("Allie's Bakery: Sasha's Cakes").wordsToCounts;
expected = new Map([['bakery', 1], ['cakes', 1], ["allie's", 1], ["sasha's", 1]]);
assert(isMapsEqual(actual, expected), desc);

function isMapsEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }
  for (let [key, val] of map1) {
    const testVal = map2.get(key);

    // In cases of an undefined value, make sure the key
    // actually exists on the object so there are no false positives
    if (testVal !== val || (testVal === undefined && !map2.has(key))) {
      return false;
    }
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