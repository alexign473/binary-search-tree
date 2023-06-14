// Create a binary search tree from an array of random numbers < 100
const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
console.log(arr);

const tree = new Tree(arr);
tree.prettyPrint();

// Confirm that the tree is balanced
console.log('Is balanced', tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log('Level-order', tree.levelOrder());
console.log('Pre-order', tree.preorder());
console.log('In-order', tree.inorder());
console.log('Post-order', tree.postorder());
console.log('Height', tree.height());

// Unbalance the tree by adding several numbers > 100
tree.insert(199);
tree.insert(200);
tree.insert(201);
tree.prettyPrint();

// Confirm that the tree is unbalanced
console.log('Is balanced', tree.isBalanced());
console.log('Height', tree.height());

// Balance the tree
tree.rebalance();
tree.prettyPrint();

// Confirm that the tree is balanced
console.log('Is balanced', tree.isBalanced());
console.log('Height', tree.height());

// Print out all elements in level, pre, post, and in order
console.log('Level-order', tree.levelOrder());
console.log('Pre-order', tree.preorder());
console.log('In-order', tree.inorder());
console.log('Post-order', tree.postorder());
