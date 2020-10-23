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
    {BinaryTreeNode} treeRoot - The root of the binary tree
  Output
    {boolean} is the binary tree "superbalanced"?
  Constraints/Considerations
    A tree is "superbalanced" if the difference between the depth of any two leaf nodes
    is no greater than one.
  Examples
    
      1                             1
     / \                           / \
    2   3   => superbalanced      2   6  => not superbalanced
   / \                           /
  4   5                         3
                               / \
                              4   5

  traverse all nodes in tree while keeping track of depth
    if node is a leaf
      if leaf depth < minLeafDepth
        minLeafDepth = leaf depth
      if leaf depth > maxLeafDepth
        maxLeafDepth = leaf depth
    if node has left child
      recur on left w/ depth + 1
    if node has right child
      recur on right w/ depth + 1
  if maxLeafDepth - minLeafDepth <= 1
    return true
  return false
  
*/
function isBalanced(treeRoot) {
  let minLeafDepth = Infinity;
  let maxLeafDepth = -Infinity;

  function findMinAndMaxLeafDepth(node, depth = 0) {
    if (!node.left && !node.right) {
      minLeafDepth = depth < minLeafDepth ? depth : minLeafDepth;
      maxLeafDepth = depth > maxLeafDepth ? depth : maxLeafDepth;
    }
    if (node.left) {
      findMinAndMaxLeafDepth(node.left, depth + 1);
    }
    if (node.right) {
      findMinAndMaxLeafDepth(node.right, depth + 1);
    }
  }

  findMinAndMaxLeafDepth(treeRoot);

  if (maxLeafDepth - minLeafDepth <= 1) {
    return true;
  }

  return false;
}

export default function () {
  // Tests

  let desc = 'full tree';
  let treeRoot = new BinaryTreeNode(5);
  let leftNode = treeRoot.insertLeft(8);
  leftNode.insertLeft(1);
  leftNode.insertRight(2);
  let rightNode = treeRoot.insertRight(6);
  rightNode.insertLeft(3);
  rightNode.insertRight(4);
  assertEquals(isBalanced(treeRoot), true, desc);

  desc = 'both leaves at the same depth';
  treeRoot = new BinaryTreeNode(3);
  leftNode = treeRoot.insertLeft(4);
  leftNode.insertLeft(1);
  rightNode = treeRoot.insertRight(6);
  rightNode.insertRight(9);
  assertEquals(isBalanced(treeRoot), true, desc);

  desc = 'leaf heights differ by one';
  treeRoot = new BinaryTreeNode(6);
  leftNode = treeRoot.insertLeft(1);
  rightNode = treeRoot.insertRight(0);
  rightNode.insertRight(7);
  assertEquals(isBalanced(treeRoot), true, desc);

  desc = 'leaf heights differ by two';
  treeRoot = new BinaryTreeNode(6);
  leftNode = treeRoot.insertLeft(1);
  rightNode = treeRoot.insertRight(0);
  rightNode.insertRight(7).insertRight(8);
  assertEquals(isBalanced(treeRoot), false, desc);

  desc = 'three leaves total';
  treeRoot = new BinaryTreeNode(1);
  leftNode = treeRoot.insertLeft(5);
  rightNode = treeRoot.insertRight(9);
  rightNode.insertLeft(8);
  rightNode.insertRight(5);
  assertEquals(isBalanced(treeRoot), true, desc);

  desc = 'both subtrees superbalanced';
  treeRoot = new BinaryTreeNode(1);
  leftNode = treeRoot.insertLeft(5);
  rightNode = treeRoot.insertRight(9);
  rightNode.insertLeft(8).insertLeft(7);
  rightNode.insertRight(5);
  assertEquals(isBalanced(treeRoot), false, desc);

  desc = 'both subtrees superbalanced two';
  treeRoot = new BinaryTreeNode(1);
  leftNode = treeRoot.insertLeft(2);
  leftNode.insertLeft(3);
  leftNode.insertRight(7).insertRight(8);
  treeRoot.insertRight(4).insertRight(5).insertRight(6).insertRight(9);
  assertEquals(isBalanced(treeRoot), false, desc);

  desc = 'three leaves at different levels';
  treeRoot = new BinaryTreeNode(1);
  leftNode = treeRoot.insertLeft(2);
  const leftLeft = leftNode.insertLeft(3);
  leftNode.insertRight(4);
  leftLeft.insertLeft(5);
  leftLeft.insertRight(6);
  treeRoot.insertRight(7).insertRight(8).insertRight(9).insertRight(10);
  assertEquals(isBalanced(treeRoot), false, desc);

  desc = 'only one node';
  treeRoot = new BinaryTreeNode(1);
  assertEquals(isBalanced(treeRoot), true, desc);

  desc = 'linked list tree';
  treeRoot = new BinaryTreeNode(1);
  treeRoot.insertRight(2).insertRight(3).insertRight(4);
  assertEquals(isBalanced(treeRoot), true, desc);

  function assertEquals(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }
}
