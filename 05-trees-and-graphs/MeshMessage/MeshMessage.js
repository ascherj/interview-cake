// A simple, somewhat inefficient queue implementation
class Queue {
  constructor() {
    this.queue = [];
    this.size = 0;
  }

  enqueue(item) {
    this.queue.unshift(item);
    this.size += 1;
  }

  dequeue() {
    this.size -= 1;
    return this.queue.pop();
  }
}

/*
  Input
    {object} graph - object where keys represent nodes and values represent neighbor nodes
    {string} startNode - the node at which to begin
    {string} endNode - the node at which to end
  Output
    {string[]} an array representing a shortest path from startNode to endNode
  Constraints/considerations
    return ANY shortest path
  Examples
    INPUT
      const network = {
        'Min'     : ['William', 'Jayden', 'Omar'],
        'William' : ['Min', 'Noam'],
        'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
        'Ren'     : ['Jayden', 'Omar'],
        'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
        'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
        'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
        'Noam'    : ['Nathan', 'Jayden', 'William'],
        'Omar'    : ['Ren', 'Min', 'Scott'],
        ...
      };
    OUTPUT
      ['Jayden', 'Amelia', 'Adam']
      
  instantiate a queue Q
  enqueue object with startNode and pathTraveled
  while Q is not empty
    dequeue from queue (use as currentNode N)
    if N is endNode
      return N.pathTraveled
    forEach neighbor of N
      enqueue object with neighbor and pathTraveled
  
  COMPLEXITY
    Time - O(N + M)
    Space - O(N)
*/
function getPath(graph, startNode, endNode) {
  if (!graph[startNode] || !graph[endNode]) {
    throw new Error('Start and end nodes must exist in the graph!');
  }

  const queue = new Queue();
  const discoveredNodes = new Set();
  queue.enqueue({ node: startNode, pathTraveled: [startNode] });

  while (queue.size > 0) {
    const n = queue.dequeue();
    discoveredNodes.add(n.node);

    if (n.node === endNode) {
      return n.pathTraveled;
    }

    const neighbors = graph[n.node];
    neighbors.forEach((neighbor) => {
      if (!discoveredNodes.has(neighbor)) {
        const updatedPath = [...n.pathTraveled, neighbor];
        queue.enqueue({ node: neighbor, pathTraveled: updatedPath });
      }
    });
  }

  return null;
}

export default function () {
  // Tests
  const graph = {
    a: ['b', 'c', 'd'],
    b: ['a', 'd'],
    c: ['a', 'e'],
    d: ['a', 'b'],
    e: ['c'],
    f: ['g'],
    g: ['f']
  };

  let desc = 'two hop path 1';
  let actual = getPath(graph, 'a', 'e');
  let expected = ['a', 'c', 'e'];
  assertDeepEqual(actual, expected, desc);

  desc = 'two hop path 2';
  actual = getPath(graph, 'd', 'c');
  expected = ['d', 'a', 'c'];
  assertDeepEqual(actual, expected, desc);

  desc = 'one hop path 1';
  actual = getPath(graph, 'a', 'c');
  expected = ['a', 'c'];
  assertDeepEqual(actual, expected, desc);

  desc = 'one hop path 2';
  actual = getPath(graph, 'f', 'g');
  expected = ['f', 'g'];
  assertDeepEqual(actual, expected, desc);

  desc = 'one hop path 3';
  actual = getPath(graph, 'g', 'f');
  expected = ['g', 'f'];
  assertDeepEqual(actual, expected, desc);

  desc = 'zero hop path';
  actual = getPath(graph, 'a', 'a');
  expected = ['a'];
  assertDeepEqual(actual, expected, desc);

  desc = 'no path';
  actual = getPath(graph, 'a', 'f');
  expected = null;
  assertDeepEqual(actual, expected, desc);

  desc = 'start node not present';
  assertThrowsError(() => {
    getPath(graph, 'h', 'a');
  }, desc);

  desc = 'end node not present';
  assertThrowsError(() => {
    getPath(graph, 'a', 'h');
  }, desc);

  function assertDeepEqual(a, b, desc) {
    const aStr = JSON.stringify(a);
    const bStr = JSON.stringify(b);
    if (aStr !== bStr) {
      console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
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
