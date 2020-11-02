class GraphNode {
  constructor(label) {
    this.label = label;
    this.neighbors = new Set();
    this.color = null;
  }
}

/*
  Input
    {GraphNode[]} graph - The undirected graph to color
    {string[]} colors - List of colors to use for coloring
  Output
    null
  Constraints/Considerations
    Use at most D + 1 colors, where D is the max degree of graph
    
  COMPLEXITY
    Time - O(N + M)
    Space - O(D)
  
  BONUS
    Can we get down to O(1) space?
    Optimize to use as few colors as possible?
*/

function colorGraph(graph, colors) {
  // color graph
  graph.forEach((node) => {
    // obtain list of colors of neighbor nodes
    const usedColors = new Set();

    node.neighbors.forEach((neighbor) => {
      // if node's neighbor is itself
      if (neighbor === node) {
        throw new Error('A node cannot have itself as a neighbor!');
      }

      if (neighbor.color !== null) {
        usedColors.add(neighbor.color);
      }
    });

    // get an unused color
    let unusedColor;

    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];

      // if this color is not in use
      if (!usedColors.has(color)) {
        // use the color
        unusedColor = color;
        break;
      }
    }

    // set current node's color to unused color
    node.color = unusedColor;
  });
}

export default function () {
  // Tests
  const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'white'];

  let graph = [];
  {
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    nodeA.neighbors.add(nodeB);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeC.neighbors.add(nodeB);
    nodeC.neighbors.add(nodeD);
    nodeD.neighbors.add(nodeC);
    graph = [nodeA, nodeB, nodeC, nodeD];
  }
  colorGraph(graph, colors);
  assertEqual(validateGraphColoring(graph), true, 'line graph');

  {
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    nodeA.neighbors.add(nodeB);
    nodeB.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeD);
    nodeD.neighbors.add(nodeC);
    graph = [nodeA, nodeB, nodeC, nodeD];
  }
  colorGraph(graph, colors);
  assertEqual(validateGraphColoring(graph), true, 'separate graph');

  {
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    nodeA.neighbors.add(nodeB);
    nodeA.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeC.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeB);
    graph = [nodeA, nodeB, nodeC];
  }
  colorGraph(graph, colors);
  assertEqual(validateGraphColoring(graph), true, 'triangle graph');

  {
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    const nodeE = new GraphNode('E');
    nodeA.neighbors.add(nodeB);
    nodeA.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeD);
    nodeB.neighbors.add(nodeE);
    nodeC.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeB);
    nodeC.neighbors.add(nodeD);
    nodeC.neighbors.add(nodeE);
    nodeD.neighbors.add(nodeB);
    nodeD.neighbors.add(nodeC);
    nodeD.neighbors.add(nodeE);
    nodeE.neighbors.add(nodeB);
    nodeE.neighbors.add(nodeC);
    nodeE.neighbors.add(nodeD);
    graph = [nodeA, nodeB, nodeC, nodeD, nodeE];
  }
  colorGraph(graph, colors);
  assertEqual(validateGraphColoring(graph), true, 'envelope graph');

  {
    const nodeA = new GraphNode('A');
    nodeA.neighbors.add(nodeA);
    graph = [nodeA];
  }
  assertThrows(() => {
    colorGraph(graph, colors);
  }, 'loop graph');

  function validateGraphColoring(graph) {
    const maxDegree = Math.max(...graph.map((node) => node.neighbors.size));

    const colorsUsed = new Set();

    graph.forEach((node) => {
      colorsUsed.add(node.color);
    });

    if (colorsUsed.has(null)) {
      return false;
    }

    if (colorsUsed.size > maxDegree + 1) {
      return false;
    }

    let badEdges = 0;

    graph.forEach((node) => {
      node.neighbors.forEach((neighbor) => {
        if (neighbor.color === node.color) {
          badEdges += 1;
        }
      });
    });

    if (badEdges > 0) {
      return false;
    }

    return true;
  }

  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }

  function assertThrows(func, desc) {
    try {
      func();
      console.log(`${desc} ... FAIL`);
    } catch (e) {
      console.log(`${desc} ... PASS`);
    }
  }
}
