function sortStack(stack) {
  const tempStack = [];

  while (!isEmpty(stack)) {
    const temp = pop(stack);
    while (!isEmpty(tempStack) && peek(tempStack) > temp) {
      push(stack, pop(tempStack));
    }
    push(tempStack, temp);
  }

  while (!isEmpty(tempStack)) {
    push(stack, pop(tempStack));
  }

  return stack;
}

// Utility functions for stack operations
function push(stack, value) {
  stack.push(value);
}

function pop(stack) {
  return stack.pop();
}

function peek(stack) {
  return stack[stack.length - 1];
}

function isEmpty(stack) {
  return stack.length === 0;
}

const stack = [5, 3, 1, 4, 2];

console.log("Original stack:", stack);
console.log("Sorted stack:", sortStack(stack));
