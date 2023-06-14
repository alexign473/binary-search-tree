/** Represents a binary tree node */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/** Represents a balanced binary tree */
class Tree {
  /** @param {Array} arr - Array of data */
  constructor(arr) {
    const sorted = this.uniqSorted(arr);
    this.root = this.buildTree(sorted);
  }

  uniqSorted(arr) {
    return [...new Set(arr)].sort((a, b) => a - b);
  }

  /** Creates a balanced binary tree
   *  full of Node objects appropriately placed
   *  @param {Array} arr - Sorted array of data
   *  @returns {Node} node - the level-0 root node
   */
  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }

    const mid = parseInt((start + end) / 2, 10);
    const node = new Node(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  /** Insert a new value */
  insert(value, node = this.root) {
    // Create a new node with the value to be inserted
    const newNode = new Node(value);

    // if the tree is empty, insert the new node as the root and early exit
    if (!this.root) {
      this.root = newNode;
      return this.root;
    }

    // Base case: if the node is null, we reach the leaf
    // insert new node
    if (node === null) {
      node = newNode;
      return node;
    }

    // If the value already exists in the tree, return node
    if (value === node.value) {
      return node;
    }

    // if the value is less than the current node's value, go left
    if (value < node.value) {
      node.left = this.insert(value, node.left);
    } else {
      // otherwise, recursively call insert on the right child
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  /** Delete value */
  delete(value, node = this.root) {
    // Base case: if the node is null, the value is not in the tree
    if (node === null) {
      console.log('Given value not found in the tree:', value);
      return;
    }
    // if the value is less than the node's value,
    // then it lies in left subtree
    if (value < node.value) {
      node.left = this.delete(value, node.left);
    }
    // if the value is more than the node's value,
    // then it lies in right subtree
    else if (value > node.value) {
      node.right = this.delete(value, node.right);
    }
    // if value is same as node's value, then this is the node
    // to be deleted
    else {
      // node with only one child or no child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // node with two children
      // get the inorder successor (smallest in the right subtree)
      let inorderSuccessor = node.right;
      while (inorderSuccessor.left !== null) {
        inorderSuccessor = inorderSuccessor.left;
      }
      // copy the inorder successor's content to this node
      const min = inorderSuccessor.value;
      node.value = min;
      node.right = this.delete(min, node.right);
    }

    return node;
  }

  /** Find the node by value */
  find(value, node = this.root) {
    if (node === null || node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this.find(value, node.left);
    }

    return this.find(value, node.right);
  }

  /** Displays an array that will represent the tree
   *  in level-order, with each sub-array representing a level of the tree. */
  levelOrder() {
    // Create an empty array to store the traversed nodes
    const result = [];
    // Create an array to keep track of the current level of nodes
    const queue = [];

    // If the tree has a root, add it to the queue
    if (this.root) {
      queue.push(this.root);
    }

    // Keep traversing the tree while there are nodes in the queue
    while (queue.length) {
      // Create an array to store the nodes of the current level
      const temp = [];
      // Store the number of nodes in the current level
      const len = queue.length;

      // Iterate through the current level of nodes
      for (let i = 0; i < len; i++) {
        // Dequeue the first node in the queue
        const node = queue.shift();
        temp.push(node.value);
        // If the node has a left child, add it to the queue
        if (node.left) {
          queue.push(node.left);
        }
        // If the node has a right child, add it to the queue
        if (node.right) {
          queue.push(node.right);
        }
      }

      result.push(temp);
    }

    return result;
  }

  /** Recursive pre-order traversal with optional callback
   *  @returns {Array} an array of values
   */
  preorderWithCb(callback) {
    const result = [];

    // Define a recursive helper function to traverse the tree
    const traverse = (node) => {
      if (!node) return;

      // Process current node
      if (callback) {
        callback(node.value);
      }

      result.push(node.value);
      // Traverse left subtree recursively
      traverse(node.left);
      // Traverse right subtree recursively
      traverse(node.right);
    };

    // Call the helper function with the root node to start the traversal
    traverse(this.root);

    return result;
  }

  /**Pre-order traversal*/
  preorder(node = this.root, result = []) {
    if (node) {
      // Add node value to result array
      result.push(node.value);
      // Traverse left subtree recursively
      this.preorder(node.left, result);
      // Traverse right subtree recursively
      this.preorder(node.right, result);
    }

    return result;
  }

  /**In-order traversal*/
  inorder(node = this.root, result = []) {
    if (node) {
      // traverse left subtree
      this.inorder(node.left, result);
      // process current node
      result.push(node.value);
      // traverse right subtree
      this.inorder(node.right, result);
    }

    return result;
  }

  /**Post-order traversal*/
  postorder(node = this.root, result = []) {
    if (node) {
      // traverse left subtree
      this.postorder(node.left, result);
      // traverse right subtree
      this.postorder(node.right, result);
      // process current node
      result.push(node.value);
    }

    return result;
  }

  height(root = this.root) {
    if (root === null) {
      return -1;
    }

    const leftH = this.height(root.left);
    const rightH = this.height(root.right);

    return Math.max(leftH, rightH) + 1;
  }

  depth(value, node = this.root) {
    if (node === null) {
      return -1;
    }

    if (value === node.value) {
      return 0;
    }

    if (value < node.value) {
      return this.depth(value, node.left) + 1;
    }

    return this.depth(value, node.right) + 1;
  }

  /** Check if the tree is balanced */
  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }

    const leftH = this.height(root.left);
    const rightH = this.height(root.right);

    if (Math.abs(leftH - rightH) <= 1) {
      return true;
    }

    return false;
  }

  /** Rebalance an unbalanced tree */
  rebalance() {
    const inorderList = this.inorder();
    this.root = this.buildTree(inorderList);
  }
}
