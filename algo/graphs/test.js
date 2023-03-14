const edges = [
  [0, 1],
  [1, 2],
  [0, 2],
];
const succProb = [0.5, 0.5, 0.2];

function buildGraph(edges) {
  const graph = new Map();
  edges = edges.map((el, i) => [...el, succProb[i]]);

  for (const [a, b, p] of edges) {
    if (!graph.has(a)) graph.set(a, {});
    if (!graph.has(b)) graph.set(b, {});

    graph.set(a, { ...graph.get(a), [b]: p });
    graph.set(b, { ...graph.get(b), [a]: p });
  }

  return graph;
}

function dijkstraHeap(graph, start, end) {
  let distances = {};
  let heap = new PriorityQueue();
  heap.enqueue(start, 0);

  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  while (!heap.isEmpty()) {
    let current = heap.dequeue().element;

    if (current === end) {
      return distances[end];
    }

    for (let neighbor in graph[current]) {
      let newDist = distances[current] + graph[current][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        heap.enqueue(neighbor, newDist);
      }
    }
  }

  return Infinity;
}

// PriorityQueue implementation
class PriorityQueue {
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
    }
  }

  dequeue() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

console.log(dijkstraHeap(buildGraph(edges), 0, 2));
