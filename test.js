import sectionOneTests from './01-array-and-string-manipulation/test.js';
import sectionTwoTests from './02-hashing-and-hash-tables/test.js';
import sectionThreeTests from './03-greedy-algorithms/test.js';
import sectionFourTests from './04-sorting-searching-and-logarithms/test.js';
import sectionFiveTests from './05-trees-and-graphs/test.js';

const tests = {
  1: sectionOneTests,
  2: sectionTwoTests,
  3: sectionThreeTests,
  4: sectionFourTests,
  5: sectionFiveTests
};

function runAllTests() {
  for (const key in tests) {
    console.log(`_____Running tests for section ${key}_____`);
    tests[key]();
  }
}

runAllTests();
