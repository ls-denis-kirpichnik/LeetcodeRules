function dijkstra(graph, startNode, endNode) {
  // Initialize the distances to each node as Infinity, except for the start node
  const distances = {};
  for (let node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
  }

  // Keep track of visited nodes
  const visited = new Set();

  // Create a priority queue using an array of [node, distance] tuples, with the start node at distance 0
  const queue = [[startNode, 0]];

  while (queue.length) {
    // Pop the node with the smallest distance
    const [currentNode, currentDistance] = queue.shift();

    // If we've already visited this node, skip it
    if (visited.has(currentNode)) {
      continue;
    }

    // Mark the current node as visited
    visited.add(currentNode);

    // Update the distances to neighboring nodes
    for (let [neighborNode, weight] of Object.entries(graph[currentNode])) {
      const totalDistance = currentDistance + weight;
      if (totalDistance < distances[neighborNode]) {
        distances[neighborNode] = totalDistance;
        queue.push([neighborNode, totalDistance]);
      }
    }
  }

  // If we couldn't find a path to the end node, return null
  if (distances[endNode] === Infinity) {
    return null;
  }

  // Backtrack from the end node to find the shortest path
  const path = [endNode];
  let currentNode = endNode;
  while (currentNode !== startNode) {
    for (let [neighborNode, weight] of Object.entries(graph[currentNode])) {
      if (distances[neighborNode] === distances[currentNode] - weight) {
        path.unshift(neighborNode);
        currentNode = neighborNode;
        break;
      }
    }
  }

  // Return the shortest path and the total distance
  return { path, distance: distances[endNode] };
}

const graph = {
  A: { B: 3, C: 1 },
  B: { A: 3, C: 7, D: 5 },
  C: { A: 1, B: 7, D: 2 },
  D: { B: 5, C: 2 },
};

// console.log(dijkstra(graph, "A", "D"));

function myOwnD(graph, startNode, endNode) {
  const distances = {};
  const visited = new Set();
  const queue = [[startNode, 0]];

  for (let node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
  }

  while (queue.lenth) {
    const [currentNode, currentDistance] = queue.shift();

    if (visited.has(currentNode)) {
      continue;
    }

    visited.add(currentNode);

    // Update the distances to neighboring nodes
    for (let [neighborNode, weight] of Object.entries(graph[currentNode])) {
      const totalDistance = currentDistance + weight;
      if (totalDistance < distances[neighborNode]) {
        distances[neighborNode] = totalDistance;
        queue.push([neighborNode, totalDistance]);
      }
    }
  }

  if (distances[endNode] === Infinity) {
    return null;
  }

  // Backtrack from the end node to find the shortest path
  const path = [endNode];
  let currentNode = endNode;
  while (currentNode !== startNode) {
    for (let [neighborNode, weight] of Object.entries(graph[currentNode])) {
      if (distances[neighborNode] === distances[currentNode] - weight) {
        path.unshift(neighborNode);
        currentNode = neighborNode;
        break;
      }
    }
  }

  return distances;
}

console.log(myOwnD(graph, "A", "D"));
