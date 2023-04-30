declare function setImmediate(callback: (...args: any[]) => void): any;

class PromiseUtilities<T> {
  all(promises: Array<PromiseX<T>>): PromiseX<T[]> {
    return new PromiseX((resolve, reject) => {
      const result: T[] = [];
      let completed = 0;

      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            result[index] = value;
            completed++;

            if (completed === promises.length) {
              resolve(result);
            }
          })
          .catch(reject);
      });
    });
  }

  race(promises: Array<PromiseX<T>>): PromiseX<T> {
    return new PromiseX((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }

  any(promises: Array<PromiseX<T>>): PromiseX<T> {
    return new PromiseX((resolve, reject) => {
      const errors: any[] = [];
      let completed = 0;

      promises.forEach((promise, index) => {
        promise.then(resolve).catch((error) => {
          errors[index] = error;
          completed++;

          if (completed === promises.length) {
            reject(new Error(JSON.stringify(errors)));
          }
        });
      });
    });
  }

  allSettled(
    promises: Array<PromiseX<T>>
  ): PromiseX<
    Array<{ status: "fulfilled" | "rejected"; value?: T; reason?: any }>
  > {
    return new PromiseX((resolve) => {
      const results: Array<{
        status: "fulfilled" | "rejected";
        value?: T;
        reason?: any;
      }> = [];
      let completed = 0;

      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            results[index] = { status: "fulfilled", value };
            completed++;

            if (completed === promises.length) {
              resolve(results);
            }
          })
          .catch((reason) => {
            results[index] = { status: "rejected", reason };
            completed++;

            if (completed === promises.length) {
              resolve(results);
            }
          });
      });
    });
  }
}

export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return Boolean(
    value &&
      typeof value === "object" &&
      "then" in value &&
      typeof value.then === "function"
  );
}

type Status = "pending" | "fullfilled" | "rejected";
type FinallyCb = () => void | PromiseLike<void>;
type ThenCallback<T, U> = (value: T) => U | PromiseLike<U>;
type CatchCallback<U> = (reason?: any) => U;
type Resolve = (value: any | PromiseLike<any>) => void;
type Reject = (reason?: any) => void;
type CallbackTuple = [
  ThenCallback<any, any> | undefined,
  CatchCallback<any> | undefined,
  Resolve,
  Reject
];

type Initializer<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (value: any) => void
) => void;

class PromiseX<T> {
  private status: Status = "pending";
  private callbacks: Array<CallbackTuple> = [];
  private error: any = undefined;
  private value: T | undefined = undefined;
  static rightAsap: any = this.createAsap();
  static utilities: PromiseUtilities<any> = new PromiseUtilities();

  constructor(initializer: Initializer<T>) {
    initializer(this.resolve, this.reject);
  }

  then<U>(
    onFulfilled?: ThenCallback<T, U>,
    onRejected?: CatchCallback<U>
  ): PromiseX<U> {
    return this.attachCallbacks(onFulfilled, onRejected);
  }

  catch<U>(onRejected?: CatchCallback<U>): PromiseX<U> {
    return this.attachCallbacks(undefined, onRejected);
  }

  finally(onFinally?: () => void | PromiseLike<void>): PromiseX<T> {
    return this.then(
      (value) =>
        PromiseX.resolve(onFinally && onFinally()).then(() => value) as T,
      (reason) =>
        PromiseX.resolve(onFinally && onFinally()).then(() => {
          throw reason;
        }) as T
    );
  }

  static resolve<U>(value: U | PromiseLike<U>): PromiseX<U> {
    return new PromiseX<U>((resolve) => resolve(value));
  }

  static reject(reason?: any): PromiseX<never> {
    return new PromiseX((_, reject) => reject(reason));
  }

  private resolve = (value: T | PromiseLike<T>): void => {
    if (isPromiseLike(value)) {
      value.then(this.resolve, this.reject);
    } else {
      this.status = "fullfilled";
      this.value = value;

      this.processNextTasks();
    }
  };

  private reject = (reason?: any): void => {
    this.status = "rejected";
    this.error = reason;

    this.processNextTasks();
  };

  private processNextTasks = (): void => {
    PromiseX.rightAsap(() => {
      if (this.status === "pending") {
        return;
      }

      const callbacks = this.callbacks;
      this.callbacks = [];

      callbacks.forEach(([onFulfilled, onRejected, resolve, reject]) => {
        try {
          this.status === "fullfilled"
            ? this.handleFulfilled(onFulfilled, resolve)
            : this.handleRejected(onRejected, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  private handleFulfilled(
    onFulfilled: ThenCallback<T, any> | undefined,
    resolve: Resolve
  ): void {
    const value = onFulfilled ? onFulfilled(this.value!) : this.value;
    resolve(value);
  }

  private handleRejected(
    onRejected: CatchCallback<any> | undefined,
    resolve: Resolve,
    reject: Reject
  ): void {
    if (onRejected) {
      const value = onRejected(this.error);
      resolve(value);
    } else {
      reject(this.error);
    }
  }

  private attachCallbacks<U>(
    onFulfilled?: ThenCallback<T, U>,
    onRejected?: CatchCallback<U>
  ): PromiseX<U> {
    const promise = new PromiseX<U>((resolve, reject) => {
      this.callbacks.push([onFulfilled, onRejected, resolve, reject]);
    });

    this.processNextTasks();

    return promise;
  }

  static all<T>(promises: Array<PromiseX<T>>): PromiseX<T[]> {
    return this.utilities.all(promises);
  }

  static race<T>(promises: Array<PromiseX<T>>): PromiseX<T> {
    return this.utilities.race(promises);
  }

  static any<T>(promises: Array<PromiseX<T>>): PromiseX<T> {
    return this.utilities.any(promises);
  }

  static allSettled<T>(
    promises: Array<PromiseX<T>>
  ): PromiseX<
    Array<{ status: "fulfilled" | "rejected"; value?: T; reason?: any }>
  > {
    return this.utilities.allSettled(promises);
  }

  static createAsap() {
    //I AM RUNNING THIS IN NODE SO NOT GONNA WORK, GOOD LUCK WITH THAT
    //   else if (
    //     typeof MutationObserver === "function" &&
    //     typeof window !== "undefined" &&
    //     typeof document !== "undefined"
    //   ) {
    //     return function asap(callback: () => void) {
    //       const observer = new MutationObserver(function () {
    //         callback();
    //         observer.disconnect();
    //       });
    //       const target = document.createElement("div");
    //       observer.observe(target, { attributes: true });
    //       target.setAttribute("data-foo", "");
    //     };
    //   }
    if (typeof setImmediate === "function") {
      return function asap(callback: () => void) {
        setImmediate(callback);
      };
    } else if (
      typeof process === "object" &&
      typeof process.nextTick === "function"
    ) {
      return function asap(callback: () => void) {
        process.nextTick(callback);
      };
    } else {
      return function asap(callback: () => void) {
        setTimeout(callback, 0);
      };
    }
  }
}

const promise = new PromiseX((resolve, reject) => {
  setTimeout(() => {
    reject("error");
  }, 500);
})
  .then(
    (val) => console.log(val),
    (bad) => console.log("kinda bad", bad)
  )
  .catch((err) => console.log(err))
  .finally(() => console.log("fuck you"));

const pr1 = new PromiseX((resolve, reject) => {
  setTimeout(() => {
    resolve("wow");
  }, 300);
});

const pr2 = new PromiseX((resolve, reject) => {
  setTimeout(() => {
    reject("error");
  }, 500);
});

PromiseX.any([pr1, pr2])
  .then((val) => console.log(val))
  .catch((err) => console.log(err));
