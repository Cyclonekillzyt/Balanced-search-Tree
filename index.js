// Node class for the balanced search tree
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

//Tree class
class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(array) {
    // sort and remove duplicates from the array
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    const build = (arr) => {
      if (arr.length === 0) {
        return null;
      }
      if (arr.length === 1) {
        return new Node(arr[0]);
      }
      const midIndex = Math.floor(arr.length / 2);
      const newNode = new Node(arr[midIndex]);
      newNode.left = build(arr.slice(0, midIndex));
      newNode.right = build(arr.slice(midIndex + 1));
      return newNode;
    };
    this.root = build(sortedArray);
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(value) {
    const traverse = (node, value) => {
      if (node === null) {
        return new Node(value);
      }
      if (node.value === value) {
        return node;
      }
      if (node.value > value) {
        node.left = traverse(node.left, value);
      } else if (node.value < value) {
        node.right = traverse(node.right, value);
      }
      return node;
    };
    this.root = traverse(this.root, value);
  }

  delete(value) {
    const traverse = (node, value) => {
      if (node === null) {
        return null;
      }

      if (node.value > value) {
        node.left = traverse(node.left, value);
      } else if (node.value < value) {
        node.right = traverse(node.right, value);
      }

      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      } else {
        let successor = node.right;
        while (successor.left !== null) {
          successor = successor.left;
        }
        node.value = successor.value;
        node.right = traverse(node.right, successor.value);

        return node;
      }
    };
    this.root = traverse(this.root, value);
  }
  find(value) {
    const traverse = (node, value) => {
      if (node === null) {
        throw new Error("build tree first");
      }
      if (node.value === value) {
        return node;
      } else if (node.value > value) {
        return traverse(node.left, value);
      } else if (node.value < value) {
        return traverse(node.right, value);
      }
    };
    return traverse(this.root, value);
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid function");
    }
    let queue = [];

    if (this.root) {
      queue.push(this.root);
    }
    while (queue.length > 0) {
      const current = queue.shift();
      callback(current.value);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid function");
    }
    const traverse = (node) => {
      if (node === null) {
        return;
      }
      traverse(node.left);
      callback(node.value);
      traverse(node.right);
    };
    traverse(this.root);
  }
  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid function");
    }
    const traverse = (node) => {
      if (node === null) {
        return;
      }
      callback(node.value);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid function");
    }
    const traverse = (node) => {
      if (node === null) {
        return;
      }
      traverse(node.left);
      traverse(node.right);
      callback(node.value);
    };
    traverse(this.root);
  }

  height(value) {
    const node = this.find(value)
    if (node === null) {
      return null;
    }
    const traverse = (node) => {
      if (node === null) {
        return 0;
      }
      let left = traverse(node.left);
      let right = traverse(node.right);
      return 1 + Math.max(left, right);
    };
    return traverse(node) -1;
  }

  depth(value) {
    const traverse = (node, depth = 0) => {
      if (node === null) {
        return null;
      }
      if (node.value === value) {
        return depth;
      }
      if (node.value > value) {
        return traverse(node.left, depth + 1);
      } else {
        return traverse(node.right, depth + 1);
      }
    };
    return traverse(this.root, value);
  }
}

const tree = new Tree();
tree.buildTree([7, 3, 1, 5, 10, 12]);
tree.prettyPrint();
console.log(tree.find(7));
const print = (value) => console.log(value);

console.log("In-order:");
tree.inOrder(print); // Expected: 3, 5, 7, 10, 12, 15, 18

console.log("Pre-order:");
tree.preOrder(print); // Expected: 10, 5, 3, 7, 15, 12, 18

console.log("Post-order:");
tree.postOrder(print); // Expected: 3, 7, 5, 12, 18, 15, 10

console.log("Level-order:");
tree.levelOrder(print);

console.log(`tree of depth : ${tree.depth(10)}`);
