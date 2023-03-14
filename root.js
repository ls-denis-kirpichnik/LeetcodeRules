function profiler(func) {
  return function (...args) {
    console.time(func.name);
    const result = func(...args);
    console.timeEnd(func.name);
    return result;
  };
}
