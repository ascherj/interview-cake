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
    {BinaryTreeNode} treeRoot - The root node of the binary tree
  Output
    {boolean} is the binary tree a BST?
  Constraints/considerations
  Examples
    
      4                          1
    /   \                      /   \
   2     6   => is a BST      2     3   => not a BST
  / \   / \                  / \   / \
 1   3 5   7                4   5 6   7     
*/

// ITERATIVE SOLUTION
// function isBinarySearchTree(treeRoot) {
//   const stack = [];
//   stack.push({
//     node: treeRoot,
//     lowerBound: -Infinity,
//     uppoerBound: Infinity
//   });

//   while (stack.length) {
//     const { node, lowerBound, upperBound } = stack.pop();

//     if (node.value <= lowerBound || node.value >= upperBound) {
//       return false;
//     }

//     if (node.left) {
//       stack.push({
//         node: node.left,
//         lowerBound: lowerBound,
//         upperBound: node.value
//       });
//     }

//     if (node.right) {
//       stack.push({
//         node: node.right,
//         lowerBound: node.value,
//         upperBound: upperBound
//       });
//     }
//   }

//   return true;
// }

// RECURSIVE SOLUTION
function isBinarySearchTree(
  treeRoot,
  lowerBound = -Infinity,
  upperBound = Infinity
) {
  if (!treeRoot) return true;
  if (treeRoot.value <= lowerBound || treeRoot.value >= upperBound)
    return false;

  return (
    isBinarySearchTree(treeRoot.left, lowerBound, treeRoot.value) &&
    isBinarySearchTree(treeRoot.right, treeRoot.value, upperBound)
  );
}

// BONUS
//  Duplicate values?
//  What if -Infinity or Infinity appear in the input tree?

export default function () {
  // Tests

  let desc = 'valid full tree';
  let treeRoot = new BinaryTreeNode(50);
  let leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(10);
  leftNode.insertRight(40);
  let rightNode = treeRoot.insertRight(70);
  rightNode.insertLeft(60);
  rightNode.insertRight(80);
  assertEquals(isBinarySearchTree(treeRoot), true, desc);

  desc = 'both subtrees valid';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(20);
  leftNode.insertRight(60);
  rightNode = treeRoot.insertRight(80);
  rightNode.insertLeft(70);
  rightNode.insertRight(90);
  assertEquals(isBinarySearchTree(treeRoot), false, desc);

  desc = 'descending linked list';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(40);
  leftNode = leftNode.insertLeft(30);
  leftNode = leftNode.insertLeft(20);
  leftNode = leftNode.insertLeft(10);
  assertEquals(isBinarySearchTree(treeRoot), true, desc);

  desc = 'out of order linked list';
  treeRoot = new BinaryTreeNode(50);
  rightNode = treeRoot.insertRight(70);
  rightNode = rightNode.insertRight(60);
  rightNode = rightNode.insertRight(80);
  assertEquals(isBinarySearchTree(treeRoot), false, desc);

  desc = 'one node tree';
  treeRoot = new BinaryTreeNode(50);
  assertEquals(isBinarySearchTree(treeRoot), true, desc);

  function assertEquals(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }
}
