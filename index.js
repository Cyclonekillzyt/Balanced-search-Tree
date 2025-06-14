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
}

const tree = new Tree();
tree.buildTree([7, 3, 1, 5, 10, 12]);
tree.prettyPrint();
tree.delete(7);
tree.prettyPrint();
