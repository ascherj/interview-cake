class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
}

/*
  Input
    {BinaryTreeNode} treeRoot - The root of the BST
  Output
    {number} The second largest element in the BST
  Constraints/Considerations
  Examples
    
        3
       /     => 2
      1
     / \
    0   2
 
  BRUTE FORCE SOLUTION
  Traverse BST using DF traversal
  Store two largest elements seen so far
  Return second largest element
*/
// function findSecondLargest(treeRoot) {
//   if (!treeRoot.left && !treeRoot.right) throw new Error('Tree has only one node!');

//   let firstLargest;
//   let secondLargest;

//   const stack = [];
//   stack.push(treeRoot);

//   while (stack.length) {
//     const node = stack.pop();

//     if (!firstLargest) {
//       firstLargest = node.value;
//     } else {
//       if (node.value > firstLargest) {
//         secondLargest = firstLargest;
//         firstLargest = node.value;
//       } else if (!secondLargest || node.value > secondLargest) {
//         secondLargest = node.value;
//       }
//     }

//     if (node.left) {
//       stack.push(node.left);
//     }

//     if (node.right) {
//       stack.push(node.right);
//     }
//   }

//   return secondLargest;
// }

// RECURSIVE SOLUTION
// Complexity
//  Time - O(h) (where h is height of tree)
//  Space - O(h)
// function findLargest(rootNode) {
//   if (!rootNode.right) {
//     return rootNode.value;
//   }
//   return findLargest(rootNode.right);
// }

// function findSecondLargest(rootNode) {
//   if (!rootNode || (!rootNode.left && !rootNode.right)) {
//     throw new Error('Tree must have at least 2 nodes!');
//   }

//   if (rootNode.left && !rootNode.right) {
//     return findLargest(rootNode.left);
//   }

//   if (rootNode.right && !rootNode.right.right && !rootNode.right.left) {
//     return rootNode.value;
//   }

//   return findSecondLargest(rootNode.right);
// }

// ITERATIVE SOLUTION
// Complexity
//  Time - O(h)
//  Space - O(1)
function findLargest(rootNode) {
  let current = rootNode;

  while (current) {
    if (!current.right) {
      return current.value;
    }
    current = current.right;
  }
}

function findSecondLargest(rootNode) {
  let current = rootNode;

  if (!current || (!current.left && !current.right)) {
    throw new Error('Tree must have at least 2 nodes!');
  }

  while (current) {
    if (current.left && !current.right) {
      return findLargest(current.left);
    }

    if (current.right && !current.right.right && !current.right.left) {
      return current.value;
    }

    current = current.right;
  }
}

export default function () {
  // Tests

  let desc = 'full tree';
  let treeRoot = new BinaryTreeNode(50);
  let leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(10);
  leftNode.insertRight(40);
  let rightNode = treeRoot.insertRight(70);
  rightNode.insertLeft(60);
  rightNode.insertRight(80);
  assertEquals(findSecondLargest(treeRoot), 70, desc);

  desc = 'largest has a left child';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(10);
  leftNode.insertRight(40);
  rightNode = treeRoot.insertRight(70);
  rightNode.insertLeft(60);
  assertEquals(findSecondLargest(treeRoot), 60, desc);

  desc = 'largest has a left subtree';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(10);
  leftNode.insertRight(40);
  rightNode = treeRoot.insertRight(70);
  leftNode = rightNode.insertLeft(60);
  leftNode.insertRight(65);
  leftNode = leftNode.insertLeft(55);
  leftNode.insertRight(58);
  assertEquals(findSecondLargest(treeRoot), 65, desc);

  desc = 'second largest is root node';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(10);
  leftNode.insertRight(40);
  rightNode = treeRoot.insertRight(70);
  assertEquals(findSecondLargest(treeRoot), 50, desc);

  desc = 'descending linked list';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(40);
  leftNode = leftNode.insertLeft(30);
  leftNode = leftNode.insertLeft(20);
  leftNode = leftNode.insertLeft(10);
  assertEquals(findSecondLargest(treeRoot), 40, desc);

  desc = 'ascending linked list';
  treeRoot = new BinaryTreeNode(50);
  rightNode = treeRoot.insertRight(60);
  rightNode = rightNode.insertRight(70);
  rightNode = rightNode.insertRight(80);
  assertEquals(findSecondLargest(treeRoot), 70, desc);

  desc = 'one node tree';
  treeRoot = new BinaryTreeNode(50);
  assertThrowsError(() => findSecondLargest(treeRoot), desc);

  desc = 'when tree is empty';
  treeRoot = null;
  assertThrowsError(() => findSecondLargest(treeRoot), desc);

  function assertEquals(a, b, desc) {
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
}
