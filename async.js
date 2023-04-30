// function _async(generatorFn) {
//   return function () {
//     const generator = generatorFn.apply(this, arguments);

//     function handle(result) {
//       if (result.done) return result.value;
//       return Promise.resolve(result.value).then(
//         (v) => handle(generator.next(v)),
//         (e) => handle(generator.throw(e))
//       );
//     }

//     return Promise.resolve().then(() => handle(generator.next()));
//   };
// }

function _async(generatorFn) {
  return function () {
    const generator = generatorFn.apply(this, arguments);

    function handle(result) {
      if (result.done) return result.value;

      return Promise.resolve(result.value).then(
        (v) => handle(generator.next(v)),
        (e) => handle(generator.throw(e))
      );
    }

    return Promise.resolve().then(() => handle(generator.next()));
  };
}

function _await(value) {
  return value;
}

function dummy() {
  return new Promise((res, rej) =>
    setTimeout(() => {
      res("wow");
    }, 1000)
  );
}

const asyncFunc = _async(function* () {
  try {
    const result1 = yield dummy();
    console.log(result1);
    const result2 = yield dummy();
    console.log(result2);
  } catch (err) {
    console.error(err);
  }
});

asyncFunc();
