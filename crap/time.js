const person1 = [
  ["9:30", "10:30"],
  ["12:00", "13:00"],
  ["16:00", "18:00"],
];
const person1Bounds = ["9:00", "20:00"];
const person2 = [
  ["10:00", "11:30"],
  ["12:30", "14:30"],
  ["14:30", "15:00"],
  ["16:00", "17:00"],
];
const person2Bounds = ["10:00", "18:30"];
const duration = 30;

// function mergeIntervals

function findAvailable() {
  const res = [];
  const bounds = [
    Math.max(+person1Bounds[0].split(":")[0], +person2Bounds[0].split(":")[0]) +
      ":00",
    Math.min(+person1Bounds[1].split(":")[0], +person2Bounds[1].split(":")[0]) +
      ":30",
  ];

  console.log("bounds", bounds);
  const arr = [...person1, ...person2].sort(
    (a, b) => +a[1].slice(0, 2) - +b[1].slice(0, 2)
  );
  //   console.log("arr b", arr);
  for (let i = 0; i < arr.length - 1; i++) {
    console.log("hasBeenCalled", i);
    const [start, end] = arr[i];
    const [startNext, endNext] = arr[i + 1];
    if (end > startNext) arr.splice(i, 2, [start, endNext]);
  }

  for (let i = 0; i < arr.length - 1; i++) {
    const [start, end] = arr[i];
    const [startNext, endNext] = arr[i + 1];

    if (end < startNext) res.push([end, startNext]);
    if (i === arr.length - 2 && +endNext.slice(0, 2) < 18.5)
      res.push([endNext, bounds[1]]);
  }
  return res;
}

console.log(findAvailable()); // [11:30, 12:00], [15:00, 16:00], [18:00, 18:30],
