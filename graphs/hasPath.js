const hasPath = (graph, source, dist) => {
  const stack = [source];

  while (stack.length > 0) {
    const current = stack.pop();

    for (let neighbor of graph[current]) {
      if (neighbor === dist) return true;
      stack.push(neighbor);
    }
  }

  return false;
};

const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

// console.log(hasPath(graph, "a", "e"));

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
    adjList[node1].push(node2);
    adjList[node2].push(node1); // Uncomment this line if the graph is undirected
  }

  return adjList;
}

console.log(
  buildGraph(3, [
    [0, 1],
    [1, 2],
    [2, 0],
  ])
);


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
      adjList[node1].push(node2);
      adjList[node2].push(node1); // Uncomment this line if the graph is undirected
    }
  
    return adjList;
  }
  
  var validPath = function(n, edges, source, destination) {
      const graph = buildGraph(edges)
      const stack = [source];
  
    while (stack.length > 0) {
      const current = stack.pop();
  
      for (let neighbor of graph[current]) {
        if (neighbor === destination) return true;
        stack.push(neighbor);
      }
    }
  
    return false;
  };