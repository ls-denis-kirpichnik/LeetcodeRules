// PROMISE ALL
async function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let count = promises.length;

    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((result) => {
          results[i] = result;
          count--;
          if (count === 0) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    });
  }).catch((err) => console.log(err));
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const delayPromise = delay(200);
const delayPromise2 = delay(1500);

promiseAll([
  delayPromise,
  Promise.resolve("Hello, World!"),
  Promise.resolve(42),
  Promise.reject("Error"),
]).then((data) => console.log(data));

// ALL SETTLED
function allSettled(promises) {
  return Promise.all(
    promises.map((promise) =>
      Promise.resolve(promise)
        .then((value) => ({ status: "fulfilled", value }))
        .catch((reason) => ({ status: "rejected", reason }))
    )
  );
}
// PROMISE RACE
function racePromises(promises) {
  return new Promise((res, rej) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => res(data)).catch((err) => rej(err));
    }
  });
}

function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    let resultErrors = new Array(promises.length);
    let count = 0;
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((err) => {
          resultErrors[i] = err;
          count++;
          if (count === promises.length) {
            reject(resultErrors);
          }
        });
    });
  });
}
