function maxProbability(n, edges, succProb, start, end) {
  // Create an adjacency list to represent the graph
  const adjList = new Array(n).fill().map(() => []);
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    adjList[u].push([v, -Math.log(succProb[i])]); // Use negative logarithm as weight
    adjList[v].push([u, -Math.log(succProb[i])]); // Graph is undirected
  }

  console.log("adjList", adjList);
  // Dijkstra's algorithm
  const distances = new Array(n).fill(Infinity);
  distances[start] = 0;
  const pq = new PQQ();
  pq.enqueue(start, 0);
  while (!pq.isEmpty()) {
    const [u, dist] = pq.dequeue();
    if (u === end) {
      return Math.exp(-dist); // Convert back to probability
    }
    if (dist > distances[u]) {
      continue;
    }
    for (const [v, weight] of adjList[u]) {
      const newDist = dist + weight;
      if (newDist < distances[v]) {
        distances[v] = newDist;
        pq.enqueue(v, newDist);
      }
    }
  }

  return 0; // No path from start to end
}

// PriorityQueue implementation
class PQQ {
  constructor() {
    this.elements = [];
  }

  enqueue(element, priority) {
    let queueElement = { element, priority };
    let added = false;
    for (let i = 0; i < this.elements.length; i++) {
      if (queueElement.priority < this.elements[i].priority) {
        this.elements.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this.elements.push(queueElement);
      console.log("state", this.elements);
    }
  }

  dequeue() {
    return this.elements.shift().element;
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

maxProbability(
  3,
  [
    [0, 1],
    [1, 2],
    [0, 2],
  ],
  0,
  2
);
