import sectionOneTests from './01-array-and-string-manipulation/test.js';
import sectionTwoTests from './02-hashing-and-hash-tables/test.js';
import sectionThreeTests from './03-greedy-algorithms/test.js';

const tests = {
  1: sectionOneTests,
  2: sectionTwoTests,
  3: sectionThreeTests
};

function runAllTests() {
  for (const key in tests) {
    console.log(`_____Running tests for section ${key}_____`);
    tests[key]();
  }
}

runAllTests();
