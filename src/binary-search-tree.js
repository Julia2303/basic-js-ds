const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  constructor() {
    this.rt = null;
  }

  root() {
    return this.rt;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rt === null) {
      this.rt = newNode;
    } else {
      insertNode(this.rt, newNode);
    }

    function insertNode(node, newNode) {
      if (node.data > newNode.data) {
        if (!node.left) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (!node.right) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    return search(this.rt, data);

    function search(node, value) {
      if (!node) {
        return null;
      }

      if (node.data === value) {
        return node;
      } else if (node.data > value) {
        return search(node.left, value);
      } else if (node.data < value) {
        return search(node.right, value);
      }
    }
  }

  remove(data) {
    this.rt = removeNode(this.rt, data);

    function removeNode(node, value) {
      if (node === null) {
        return node;
      }

      if (node.data === value) {
        if (node.left === null && node.right === null) {
          return null;
        } else if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        } else {
          let smallestNode = searchSmallestNode(node.right);
          node.data = smallestNode.data;
          node.right = removeNode(node.right, smallestNode.data);
          return node;
        }
        
      } else if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;

      } else {
        node.right = removeNode(node.right, value);
        return node;
      }
    }

    function searchSmallestNode(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }
  }

  min() {
    let node = this.rt;

    if (!node) {
      return null;
    }

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.rt;

    if (!node) {
      return null;
    }

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
};
