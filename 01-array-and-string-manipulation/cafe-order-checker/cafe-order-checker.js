// I:
//  number[] array - The array to be searched
//  number order   - The order to search for
//  number index   - The index from which to begin searching
// O:
//  boolean        - Has the order been paid for?
// C:
//  Time -  O(n - index)
//  Space - O(1)
// E:
//  array - [7, 2, 6, 11, 1]
//  order - 11
//  index - 1
//  OUTPUT - true; order has been paid for
function isOrderPaidFor(array, order, index) {
  for (let i = index; i < array.length; i++) {
    // order found; is paid for
    if (array[i] === order) {
      return true;
    }
  }
  // order not found; is not paid for
  return false;
}

function isFirstComeFirstServed(takeOutOrders, dineInOrders, servedOrders) {
  // I: 3 arrays of unique integers
  // O: boolean indicating if service is first-come, first-served
  // C: O(n) run-time, O(1) space-time
  // E:
  //  takeOutOrders - [6, 10, 2, 8]
  //  dineInOrders   - [1, 9, 7, 11]
  //  servedOrders  - [1, 6, 2, 10, 9, 8, 7, 11] -> IS NOT first-come, first-served

  //  takeOutOrders - [6, 10, 2, 8]
  //  dineInOrders   - [1, 9, 7, 11]
  //  servedOrders  - [1, 6, 10, 2, 9, 8, 7, 11] -> IS first-come, first-served

  // BELOW COMMENTED SOLUTION HAS INEFFICIENT TIME COMPLEXITY
  // (takeOutOrders and dineInOrders will have their entire contents shifted
  // for each matching order number)

  // for (let i = 0; i < servedOrders.length; i++) {
  //   const nextTakeOut = takeOutOrders[0];
  //   const nextDineIn = dineInOrders[0];
  //   const orderBeingServed = servedOrders[i];

  //   if (nextTakeOut === orderBeingServed) {
  //     takeOutOrders.shift();
  //   } else if (nextDineIn === orderBeingServed) {
  //     dineInOrders.shift();
  //   } else {
  //     return false;
  //   }
  // }

  // return !(takeOutOrders.length || dineInOrders.length);

  let takeOutIndex = 0;
  let dineInIndex = 0;

  for (let i = 0; i < servedOrders.length; i++) {
    const nextTakeOutOrder = takeOutOrders[takeOutIndex];
    const nextDineInOrder = dineInOrders[dineInIndex];
    const servedOrder = servedOrders[i];

    if (nextTakeOutOrder === servedOrder) {
      takeOutIndex++;
    } else if (nextDineInOrder === servedOrder) {
      dineInIndex++;
    } else {
      // check if served order is unpaid
      const takeOutPaid = isOrderPaidFor(
        takeOutOrders,
        servedOrder,
        takeOutIndex + 1
      );
      const dineInPaid = isOrderPaidFor(
        dineInOrders,
        servedOrder,
        takeOutIndex + 1
      );
      if (!(takeOutPaid || dineInPaid)) {
        throw 'Order not paid for!';
      }
      return false;
    }
  }

  // check for unserved orders
  const takeOutHasUnservedOrders = takeOutIndex !== takeOutOrders.length;
  const dineInHasUnservedOrders = dineInIndex !== dineInOrders.length;
  if (takeOutHasUnservedOrders || dineInHasUnservedOrders) {
    throw 'One or more orders have not been served!';
  }

  return true;
}

// BONUS:
//  (DONE) Adapt solution to handle arrays of customer orders with potential repeats
//  Throw exception if submitted orders were never served, or if unpaid orders were served
//    - (DONE) Handle unserved orders
//    - (DONE) Handle unpaid orders being served
//  Iterate through servedOrders from back to front; is this cleaner?

export default function () {
  // Tests

  let desc = 'both registers have same number of orders';
  let actual = isFirstComeFirstServed([1, 4, 5], [2, 3, 6], [1, 2, 3, 4, 5, 6]);
  assertEquals(actual, true, desc);

  desc = 'registers have different lengths';
  actual = isFirstComeFirstServed([1, 5], [2, 3, 6], [1, 2, 6, 3, 5]);
  assertEquals(actual, false, desc);

  desc = 'one register is empty';
  actual = isFirstComeFirstServed([], [2, 3, 6], [2, 3, 6]);
  assertEquals(actual, true, desc);

  desc = 'served orders is missing orders';
  actual = isFirstComeFirstServed([1, 5], [2, 3, 6], [1, 6, 3, 5]);
  assertEquals(actual, false, desc);

  desc = 'served orders has extra orders';
  try {
    isFirstComeFirstServed([1, 5], [2, 3, 6], [1, 2, 3, 5, 6, 8]);
  } catch (e) {
    assertEquals(e, 'Order not paid for!', desc);
  }

  desc = 'one register has extra orders';
  try {
    isFirstComeFirstServed([1, 9], [7, 8], [1, 7, 8]);
  } catch (e) {
    assertEquals(e, 'One or more orders have not been served!', desc);
  }

  desc = 'one register has unserved orders';
  try {
    isFirstComeFirstServed([55, 9], [7, 8], [1, 7, 8, 9]);
  } catch (e) {
    assertEquals(e, 'Order not paid for!', desc);
  }

  desc = 'order numbers are not sequential';
  actual = isFirstComeFirstServed(
    [27, 12, 18],
    [55, 31, 8],
    [55, 31, 8, 27, 12, 18]
  );
  assertEquals(actual, true, desc);

  // Bonus tests

  desc = 'order numbers contain repeats';
  actual = isFirstComeFirstServed(
    [1, 2, 3, 1],
    [7, 8, 9, 9],
    [1, 2, 7, 3, 1, 8, 9, 9]
  );
  assertEquals(actual, true, desc);

  desc = 'order is paid for';
  actual = isOrderPaidFor([7, 2, 6, 11, 1], 11, 1);
  assertEquals(actual, true, desc);

  desc = 'order is not paid for';
  actual = isOrderPaidFor([7, 2, 6, 11, 1], 13, 1);
  assertEquals(actual, false, desc);

  desc = 'unserved order exists';
  try {
    isFirstComeFirstServed([1, 2, 3, 4], [5, 6, 7, 8], [1, 2, 3, 5, 6, 7, 8]);
  } catch (e) {
    assertEquals(e, 'One or more orders have not been served!', desc);
  }

  desc = 'unpaid order was served';
  try {
    isFirstComeFirstServed([1, 4, 5], [2, 3, 6], [1, 2, 3, 100, 4, 5, 6]);
  } catch (e) {
    assertEquals(e, 'Order not paid for!', desc);
  }

  function assertEquals(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }
}
