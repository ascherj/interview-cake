function getMaxProfit(stockPrices) {
  /*
  Input
    {number[]} stockPrices - Apple share prices every minute
  Output
    {number} - max profit obtainable from one purchase and one sale of one Apple stock
  Constraints/Considerations
    no "shorting"
    no buying and selling in same step
  Examples
    Input
      [10, 7, 5, 8, 11, 9]
    Output
      6 (buy at $5, sell at $11)
  Edge cases
    array length < 2
    
    
  initialize result
  for each elem x in array
    for each subsequent elem y in array
      if y - x > result
        update result
  return result
  */
  
  if (stockPrices.length < 2) {
    throw 'stockPrices must contain at least 2 elements!';
  }

  // Brute force solution: O(n^2) runtime
  // let maxProfit = -Infinity;
  // for (let i = 0; i < stockPrices.length - 1; i++) {
  //   for (let j = i + 1; j < stockPrices.length; j++) {
  //     const buyPrice = stockPrices[i];
  //     const sellPrice = stockPrices[j];
  //     const currentProfit = sellPrice - buyPrice;
      
  //     if (currentProfit > maxProfit) {
  //       maxProfit = currentProfit;
  //     }
  //   }
  // }
  // return maxProfit;
  
  let minSoFar = stockPrices[0];
  let maxProfitSoFar = -Infinity;
  for (let i = 1; i < stockPrices.length; i++) {
    const currentPrice = stockPrices[i];
    const currentProfit = currentPrice - minSoFar;
    if (currentProfit > maxProfitSoFar) {
      maxProfitSoFar = currentProfit;
    }
    if (currentPrice < minSoFar) {
      minSoFar = currentPrice;
    }
  }
  return maxProfitSoFar;
  
  // Complexity analysis
  //  Time: O(n)
  //  Space: O(1)
}


// Tests

let desc = 'price goes up then down';
let actual = getMaxProfit([1, 5, 3, 2]);
let expected = 4;
assertEqual(actual, expected, desc);

desc = 'price goes down then up';
actual = getMaxProfit([7, 2, 8, 9]);
expected = 7;
assertEqual(actual, expected, desc);

desc = 'price goes up all day';
actual = getMaxProfit([1, 6, 7, 9]);
expected = 8;
assertEqual(actual, expected, desc);

desc = 'price goes down all day';
actual = getMaxProfit([9, 7, 4, 1]);
expected = -2;
assertEqual(actual, expected, desc);

desc = 'price stays the same all day';
actual = getMaxProfit([1, 1, 1, 1]);
expected = 0;
assertEqual(actual, expected, desc);

desc = 'error with empty prices';
const emptyArray = () => (getMaxProfit([]));
assertThrowsError(emptyArray, desc);

desc = 'error with one price';
const onePrice = () => (getMaxProfit([1]));
assertThrowsError(onePrice, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
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