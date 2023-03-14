/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
// var allPathsSourceTarget = function (graph) {
//   const paths = [];
//   const d = graph.length - 1;

//   function dfs(c, currPath) {
//     if (c == d) {
//       paths.push(currPath);
//       return;
//     }

//     for (let i = 0; i < graph[c].length; i++) {
//       dfs(graph[c][i], [...currPath, graph[c][i]]);
//     }
//   }
//   dfs(0, [0]);

//   return paths;
// };
let result;
var allPathsSourceTarget = function (graph) {
  if (!graph) return null;
  result = Array();
  dfs(graph);
  return result;
};

const dfs = (graph, curr = 0, path = []) => {
  path.push(curr);
  const lastEl = graph.length - 1;

  if (curr === lastEl) {
    result.push([...path]);
  }
  console.log("path b", path);
  for (let j = 0; j < graph[curr].length; j++) {
    dfs(graph, graph[curr][j], path);
  }

  path.pop();
  console.log("path a", path);
};

const graph = [[1, 2], [3], [3], []];

allPathsSourceTarget(graph);

console.log(result);
// Output: [
//     [0, 1, 3],
//     [0, 2, 3],
//   ];
