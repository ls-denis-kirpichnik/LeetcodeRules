function sleep(ms) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}

function fetchWithTimeout(url, timeout) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    fetch(url)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => clearTimeout(timer));
  });
}

function retry(fn, maxRetries, interval) {
  let retries = 0;
  let errorM;

  return new Promise((res, rej) => {
    function attempt() {
      fn().then((data) =>
        res(data).catch((err) => {
          errorM = err;
          retries++;

          if (retries < maxRetries) {
            rej(errorM);
          } else {
            setTimeout(attempt, interval);
          }
        })
      );
    }

    attempt();
  });
}

async function sequence1(asyncFns) {
  const res = [];

  for (const asyncFn of asyncFns) {
    try {
      const data = await asyncFn();
      res.push(data);
    } catch (err) {
      throw err;
    }
  }

  return res;
}

function sequence2(asyncFns) {
  const res = [];

  return new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < asyncFns.length; i++) {
        res.push(await asyncFns[i]());
      }
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

function debounce(callback, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function promiseAllSettled(promises) {
  const wrappedPromises = promises.map((promise) =>
    promise
      .then((value) => ({ status: "fulfilled", value }))
      .catch((reason) => ({ status: "rejected", reason }))
  );

  return Promise.all(wrappedPromises);
}

function promiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    const settled = [];

    const settlePromise = (promise, index) => {
      promise
        .then((value) => {
          settled[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          settled[index] = { status: "rejected", reason };
        })
        .finally(() => {
          const completed = settled.filter(Boolean).length;
          if (completed === promises.length) {
            resolve(settled);
          }
        });
    };

    promises.forEach(settlePromise);
  });
}

function throttle(callback, delay) {
  let wait = false;

  return function (...args) {
    if (wait) return;

    callback(...args);
    wait = true;

    setTimeout(() => {
      wait = false;
    }, delay);
  };
}

function timeoutPromise(duration, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, duration);
  });
}

async function parallelLimit(asyncFns, limit) {
  const results = [];

  let running = 0;
  let index = 0;

  while (index < asyncFns.length) {
    if (running < limit) {
      const promise = asyncFns[index]();
      running++;
      index++;

      promise
        .then((result) => {
          results.push(result);
          running--;
        })
        .catch((error) => {
          results.push(error);
          running--;
        });
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 10);
      });
    }
  }

  await Promise.all(
    asyncFns.slice(index).map((fn) => fn().catch((error) => error))
  );

  return results;
}

// Implement a function racePromises(promises) that takes an array of Promises and returns a
// Promise that resolves with the result of the first Promise to resolve or rejects with
//  the error of the first Promise to reject.

function racePromises(promises) {
  return new Promise((res, rej) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => res(data)).catch((err) => rej(err));
    }
  });
}
// Implement a function retryWithDelay(fn, delayFn) that takes a function fn and a delay
// function delayFn that returns a Promise that resolves after a delay. The function should
// repeatedly call fn until it succeeds, but delay between retries using delayFn. The function should
// return a Promise that resolves with the result of fn. If fn fails on all retries, the promise should reject with the final error.

async function retryWithDelay(fn, delayFn, maxRetries) {
  let retries = 0;
  let result;

  while (retries < maxRetries) {
    try {
      result = await fn();
      return result;
    } catch (err) {
      retries++;
      if (retries >= maxRetries) {
        throw error;
      }
    }

    await delayFn();
  }
}

// Implement a function memoizeAsync(fn) that takes a function fn
// that returns a Promise and returns a memoized version of the function that caches its results.
// The function should return a new function that accepts the same arguments as fn and returns a Promise
// that resolves with the cached result if it exists,
// or calls fn to compute the result and caches it for future calls.

function memoizeAsync(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(...args);
    return new Promise((res, rej) => {
      if (cache[key]) {
        res(cache[key]);
      } else {
        fn()
          .then((result) => {
            cache[key] = result;
            res(result);
          })
          .catch((err) => console.log(err));
      }
    });
  };
}
//
async function mapAsync(iterable, mapper, concurrency) {
  const results = [];

  return new Promise((resolve, reject) => {
    async function next() {
      let index = 0;
      let running = 0;
      if (index >= iterable.length && running === 0) {
        resolve(results);
        return;
      }

      while (running < concurrency && index < iterable.length) {
        const item = iterable[index];
        const promise = mapper(item);

        promise
          .then((result) => {
            results.push(result);
            running--;
          })
          .catch((err) => {
            results.push(err);
            running--;
          });
      }
      await new Promise((res) => setTimeout(res, 10));

      await next();
    }

    next();
  });
}

function retryWithBackoff(fn, maxRetries, baseDelay, maxDelay) {
  let retries = 0;
  let delay = baseDelay;

  return new Promise((resolve, reject) => {
    function tryOnce() {
      fn()
        .then((res) => resolve(res))
        .catch((err) => {
          retries++;
          delay = Math.min(delay * 2, maxDelay);
          if (retries >= maxRetries) {
            reject(err);
          } else {
            setTimeout(tryOnce, delay);
          }
        });
    }

    tryOnce();
  });
}

function rateLimiter(fn, callLimit, timeLimit) {
  const queue = [];
  let calls = 0;
  let timer;

  function processTick() {
    if (queue.length > 0) {
      const { resolve, args } = queue.shift();
      fn(...args)
        .then((result) => resolve(result))
        .finally(() => {
          calls--;
          if (queue.length > 0) {
            processTick();
          } else {
            clearTimeout(timer);
            timer = null;
          }
        });
    }
  }

  return function (...args) {
    return new Promise((resolve) => {
      if (calls < callLimit) {
        calls++;
        fn(...args)
          .then((result) => resolve(result))
          .finally(() => {
            calls--;
            if (queue.length > 0) {
              processTick();
            }
          });
      } else {
        queue.push({ resolve, args });
        if (!timer) {
          timer = setTimeout(() => {
            calls = 0;
            processTick();
          }, timeLimit);
        }
      }
    });
  };
}

function rateLimiter2(fn, callLimit, timeLimit) {
  const queue = [];
  let calls = 0;
  let timer;

  async function processTick() {
    if (queue.length > 0) {
      const { resolve, args } = queue.shift();
      try {
        const result = await fn(...args);
        resolve(result);
      } catch (err) {
        console.error(err);
      } finally {
        calls--;
        if (queue.length > 0) {
          processTick();
        } else {
          clearTimeout(timer);
          timer = null;
        }
      }
    }
  }

  return async function (...args) {
    return new Promise(async (resolve) => {
      if (calls < callLimit) {
        calls++;
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          calls--;
          if (queue.length > 0) {
            processTick();
          }
        }
      } else {
        queue.push({ resolve, args });
        if (!timer) {
          timer = setTimeout(() => {
            calls = 0;
            processTick();
          }, timeLimit);
        }
      }
    });
  };
}

function rateLimiter(fn, timeLimit, callLimit) {
  const queue = [];
  let calls = 0;
  let timer;

  async function processQueue() {
    if (queue.length > 0) {
      const { resolve, args } = queue.shift();
      try {
        const data = await fn(...args);
        resolve(data);
      } catch (err) {
        console.log(err);
      } finally {
        calls--;
        processQueue();
      }
    } else {
      clearTimeout(timer);
      timer = null;
    }
  }

  return async function rateLimitedFn(...args) {
    if (calls >= callLimit) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, args });
      });
    }
    calls++;
    try {
      const data = await fn(...args);
      calls--;
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      if (!timer) {
        timer = setTimeout(() => {
          calls = 0;
          processQueue();
        }, timeLimit);
      }
    }
  };
}
