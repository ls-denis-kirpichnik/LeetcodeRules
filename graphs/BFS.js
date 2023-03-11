const breadthFirstPrint = (graph, source) => {
  const queue = [source];

  while (queue.length > 0) {
    const current = queue.shift();

    console.log("current", current);

    for (let neighbor of graph[current]) {
      queue.unshift(neighbor);
    }
  }
};

const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

breadthFirstPrint(graph, "a");
