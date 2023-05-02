function isBalanced(root) {
  function checkBalance(node) {
    if (!node) {
      return { height: 0, balanced: true };
    }

    let left = checkBalance(node.left);
    let right = checkBalance(node.right);

    let balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
    let height = Math.max(left.height, right.height) + 1;

    return { height: height, balanced: balanced };
  }

  return checkBalance(root).balanced;
}
