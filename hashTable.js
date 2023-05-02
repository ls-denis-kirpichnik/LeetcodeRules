function hash(key, arraySize) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i) * i) % arraySize;
  }
  return hash;
}
