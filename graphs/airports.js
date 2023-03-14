const airports = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(" ");

const routes = [
  ["PHX", "LAX"],
  ["PHX", "JFK"],
  ["JFK", "OKC"],
  ["JFK", "HEL"],
  ["JFK", "LOS"],
  ["MEX", "LAX"],
  ["MEX", "BKK"],
  ["MEX", "LIM"],
  ["MEX", "EZE"],
  ["LIM", "BKK"],
];

function buildAdjencyList() {
  const adjencyList = new Map();

  function addNode(airport) {
    adjencyList.set(airport, []);
  }

  function addEdge(origin, destination) {
    adjencyList.get(origin).push(destination);
    adjencyList.get(destination).push(origin);
  }

  airports.forEach(addNode);
  routes.forEach((route) => addEdge(...route));
}

buildAdjencyList();

function hasPath(adjencyList, source, dest) {
  const visited = new Set();
  const stack = [source];

  while (stack.length > 0) {
    const airport = stack.pop();

    const destinations = adjencyList.get(airport);

    for (const destionation of destinations) {
      if (destionation === dest) return true;
      if (!visited.has(destionation)) {
        stack.push(destionation);
        visited.add(destionation);
      }
    }
  }

  return false;
}

console.log(hasPath(adjencyList, "PHX", "LOS"));
