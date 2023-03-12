export function isPathAvailable(tree, nodeId) {
  if (!tree) {
    return false;
  }

  return isPathFound(tree, nodeId);

  function isPathFound(tree, nodeId) {
    return nodeId === tree.id
      ? true
      : !!tree.children.find(child => isPathFound(child, nodeId));
  }
}

export function findNode(tree, nodeId) {
  return tree.id === nodeId
    ? tree
    : tree.children?.reduce(
        (childrenTree, childNode) =>
          childrenTree || findNode(childNode, nodeId),
        undefined
      );
}

export function buildTree(array, manager = null) {
  return array
    .filter(item => item.manager === manager)
    .map(child => ({
      ...child,
      children: buildTree(array, child.id),
    }));
}

export function findPathFromRoot(tree, nodeId) {
  if (tree.id === nodeId) return [nodeId];
  /* this branch can be removed if your tree will always have a 
     children array for all nodes since falsy return check for path is handled */
  if (tree.children.length === 0) return false;
  let path;
  tree.children.find(child => (path = findPathFromRoot(child, nodeId)));
  if (path) {
    return [tree.id].concat(path);
  }
}
