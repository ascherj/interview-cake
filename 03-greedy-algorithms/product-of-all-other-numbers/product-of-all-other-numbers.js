function getProductsOfAllIntsExceptAtIndex(intArray) {
  /*
  Input
    {number[]} intArray - an array of integers
  Output
    {number[]} a mapped array of integers where each element represents
    the product of every integer in the input except for the elem at that index
  Contraints
    no division
  Examples
    [1, 2, 3] -> [6, 3, 2]
    
    [1, 2, 6, 5, 9]
    [2 * 6 * 5 * 9, 1 * 6 * 5 * 9, 1 * 2 * 5 * 9, 1 * 2 * 6 * 9, 1 * 2 * 6 * 5]
    
  for each integer x
    for each integer y other than x
      obtain product of integers
  */

  /*
  SIMPLE SOLUTION (not optimized)
  
  Complexity
    Time - O(n^2)
    Space - O(1)
  */  
  // if (intArray.length <= 1) {
  //   throw new Error('Array length must be greater than 1');
  // }
  
  // return intArray.map((x, i) => {
  //   let productSansX = 1;
  //   for (let j = 0; j < intArray.length; j++) {
  //     if (i === j) continue;
  //     productSansX *= intArray[j];
  //   }
  //   return productSansX;
  // });
  
  
  /*
  SECOND ATTEMPT
  
  Complexity
    Time - O(3n) -> O(n)
    Space - O(2n) -> O(n)
  */
  // function getProductsBeforeIndex(array) {
  //   const productsBeforeIndex = [];
    
  //   for (let i = 0; i < array.length; i++) {
  //     if (i === 0) {
  //       productsBeforeIndex.push(1);
  //     } else {
  //       const prevInt = array[i - 1];
  //       const prevProduct = productsBeforeIndex[i - 1];
  //       productsBeforeIndex.push(prevProduct * prevInt);
  //     }
  //   }
    
  //   return productsBeforeIndex;
  // }
  
  // function getProductsAfterIndex(array) {
  //   const productsAfterIndex = [];
    
  //   for (let i = array.length - 1; i >= 0; i--) {
  //     if (i === array.length - 1) {
  //       productsAfterIndex[array.length - 1] = 1;
  //     } else {
  //       const nextInt = array[i + 1];
  //       const nextProduct = productsAfterIndex[i + 1];
  //       productsAfterIndex[i] = nextProduct * nextInt;
  //     }
  //   }
    
  //   return productsAfterIndex;
  // }
  
  // if (intArray.length <= 1) {
  //   throw new Error('Array length must be greater than 1');
  // }
  
  // const productsBeforeIndex = getProductsBeforeIndex(intArray);
  // const productsAfterIndex = getProductsAfterIndex(intArray);
  
  // return intArray.map((elem, i) => productsBeforeIndex[i] * productsAfterIndex[i]);
  
  /*
  THIRD ATTEMPT
  
  Complexity
    Time - O(2n) -> O(n)
    Space - O(n)
  */
  if (intArray.length <= 1) {
    throw new Error('Array length must be greater than 1');
  }
  
  const products = [];
  
  // find products of ints before index
  for (let i = 0; i < intArray.length; i++) {
    if (i === 0) {
      products.push(1);
    } else {
      const prevInt = intArray[i - 1];
      const prevProduct = products[i - 1];
      products.push(prevProduct * prevInt);
    }
  }
  
  // find products of of ints after index and multiply with current state of products array
  let nextProduct = 1;
  for (let i = intArray.length - 1; i >= 0; i--) {
    products[i] *= nextProduct
    nextProduct *= intArray[i];
  }
  
  return products;
}

export default function () {
  // Tests
  
  let desc = 'short array';
  let actual = getProductsOfAllIntsExceptAtIndex([1, 2, 3]);
  let expected = [6, 3, 2];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'longer array',
  actual = getProductsOfAllIntsExceptAtIndex([8, 2, 4, 3, 1, 5]);
  expected = [120, 480, 240, 320, 960, 192];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'array has one zero',
  actual = getProductsOfAllIntsExceptAtIndex([6, 2, 0, 3]);
  expected = [0, 0, 36, 0];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'array has two zeros';
  actual = getProductsOfAllIntsExceptAtIndex([4, 0, 9, 1, 0]);
  expected = [0, 0, 0, 0, 0];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'one negative number';
  actual = getProductsOfAllIntsExceptAtIndex([-3, 8, 4]);
  expected = [32, -12, -24];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'all negative numbers';
  actual = getProductsOfAllIntsExceptAtIndex([-7, -1, -4, -2]);
  expected = [-8, -56, -14, -28];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'error with empty array';
  const emptyArray = () => (getProductsOfAllIntsExceptAtIndex([]));
  assertThrowsError(emptyArray, desc);
  
  desc = 'error with one number';
  const oneNumber = () => (getProductsOfAllIntsExceptAtIndex([1]));
  assertThrowsError(oneNumber, desc);
  
  function assertArrayEquals(a, b, desc) {
    const arrayA = JSON.stringify(a);
    const arrayB = JSON.stringify(b);
    if (arrayA !== arrayB) {
      console.log(`${desc} ... FAIL: ${arrayA} != ${arrayB}`)
    } else {
      console.log(`${desc} ... PASS`);
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