const edges = [
  [2, 3],
  [1, 2],
  [3, 4],
  [1, 3],
  [1, 4],
  [0, 1],
  [2, 4],
  [0, 4],
  [0, 2],
];

const succProb = [0.06, 0.26, 0.49, 0.25, 0.2, 0.64, 0.23, 0.21, 0.77];

function allPaths(graph, start, end) {
  const visited = new Set();
  const paths = [];

  function dfs(node, path) {
    if (node === end) {
      paths.push(path);
      return;
    }
    visited.add(node);
    for (const { node: t, prob } of graph[node]) {
      if (!visited.has(t)) {
        dfs(t, [...path, { node: t, prob }]);
      }
    }
    visited.delete(node);
  }

  dfs(start, [start]);
  return paths;
}

function buildGraph(edges) {
  const adjList = {};

  // Add nodes to the adjacency list
  for (let i = 0; i < edges.length; i++) {
    const [node1, node2] = edges[i];
    if (!adjList[node1]) {
      adjList[node1] = [];
    }
    if (!adjList[node2]) {
      adjList[node2] = [];
    }
    adjList[node1].push({ node: node2, prob: succProb[i] });
    adjList[node2].push({ node: node1, prob: succProb[i] }); // Uncomment this line if the graph is undirected
  }

  return adjList;
}

function maxProbability(n, edges, succProb, start, end) {
  const graph = buildGraph(edges, succProb);

  const paths = allPaths(graph, start, end);

  function check(paths) {
    return paths.reduce((acc, el) => {
      const chance = el.slice(1).reduce((a, b) => a.prob * b.prob);

      if (typeof chance === "number" && !isNaN(chance)) acc = [...acc, chance];
      console.log(acc);
      return acc.map((el) => (typeof el === "number" ? el : el.prob));
    }, []);
  }

  return Math.max(...check(paths));
}

// class PriorityQueue {
//   constructor() {
//     this.values = [];
//   }

//   enqueue(val, priority) {
//     this.values.push({ val, priority });
//     this.sort();
//   }

//   dequeue() {
//     return this.values.shift();
//   }

//   sort() {
//     this.values.sort((a, b) => a.priority - b.priority);
//   }

//   isEmpty() {
//     return this.values.length === 0;
//   }
// }

function profiler(func) {
  return function (...args) {
    console.time(func.name);
    const result = func(...args);
    console.timeEnd(func.name);
    return result;
  };
}

const test = profiler(maxProbability);

console.log(test(3, edges, succProb, 0, 2)); // -> true
