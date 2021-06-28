function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

function BST() {
  this.root = null;
  // 插入节点
  function insert(data) {
    var node = new Node(data, null, null);
    if (this.root == null) {
      this.root = node;
    } else {
      var currentNode = this.root;
      var parent;
      while (true) {
        parent = currentNode;
        if (data < currentNode.data) {
          currentNode = currentNode.left;
          if (currentNode == null) {
            parent.left = node;
            break;
          }
        } else {
          currentNode = currentNode.right;
          if (currentNode == null) {
            parent.right = node;
            break;
          }
        }
      }
    }
  }
  // 查找节点

  function find(data) {
    var currentNode = this.root;
    while (currentNode) {
      if (data == currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.right) {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  // 先序遍历递归
  function preOrder() {
    var result = [];
    preOrderFn(this.root, result);
    return result;
  }

  function preOrderFn(node, result) {
    if (node != null) {
      result.push(node.data);
      preOrderFn(node.left, result);
      preOrderFn(node.right, result);
    }
  }

  // 先序遍历循环

  function preOrderWhile() {
    var stack = [];
    var result = [];
    var currentNode = this.root;
    while (currentNode || stack.length > 0) {
      while (currentNode) {
        result.push(currentNode.data);
        stack.push(currentNode);
        currentNode = currentNode.left;
      }
      if (stack.length > 0) {
        currentNode = currentNode.pop();
        currentNode = currentNode.right;
      }
    }
    return result;
  }

  // 中序遍历递归
  function inOrder() {
    var result = [];
    inOrderFn(this.root, result);
    return result;
  }

  function inOrderFn(node, result) {
    if (node != null) {
      inOrderFn(node.left, result);
      result.push(node.data);
      inOrderFn(node.right, result);
    }
  }
  // 中序遍历循环
  function inOrderWhile() {
    var stack = [];
    var result = [];
    var currentNode = this.root;
    while (currentNode || stack.length > 0) {
      while (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }
      if (stack.length > 0) {
        currentNode = stack.pop();
        result.push(currentNode.data);
        currentNode = currentNode.right;
      }
    }
  }
  // 后序遍历递归
  function postOrder() {
    var result = [];
    postOrderFn(this.root, result);
    return result;
  }

  function postOrderFn(node, result) {
    if (node != null) {
      postOrderFn(node.left, result);
      postOrderFn(node.right, result);
      result.push(node.data);
    }
  }

  // 后序遍历循环
  function postOrderWhile() {
    var preNode = null;
    var currentNode = null;
    var stack = [this.root];
    var result = [];
    while (stack.length > 0) {
      currentNode = stack[stack.length - 1];
      if (
        preNode == null ||
        preNode.left == currentNode ||
        preNode.right == currentNode
      ) {
        if (currentNode.left) {
          stack.push(currentNode.left);
        } else if (currentNode.right) {
          stack.push(currentNode.right);
        }
      } else if (currentNode.left == preNode) {
        if (currentNode.right) {
          stack.push(currentNode.right);
        }
      } else {
        result.push(currentNode.data);
        stack.pop();
      }
      preNode = currentNode;
    }
  }

  // 获取最大值

  function findMax(node) {
    var preNode;
    while (node) {
      preNode = node;
      node = node.right;
    }
    return preNode.data;
  }

  // 获取最小值
  function findMin(node) {
    var preNode;
    while (node) {
      preNode = node;
      node = node.left;
    }
    return preNode.data;
  }

  // 最大移除
  function removeByMax(data) {
    return this.removeByMax(this.root, data);
  }
  function removeByMaxFn(node, data) {
    if (node == null) return null;
    if (data == node.data) {

        if (node.left == null || node.right == null) {
            return null
        }
        if (node.left == null) {
            return node.right
        }
        if (node.right == null) {
            return node.left
        }
        var maxData = findMax(node.left)
        node.data = maxData
        node.left = removeByMaxFn(currentNode.left, maxData)
        return currentNode
    } else if (data < currentNode.data) {
        return removeByMaxFn(node.left, data)
    } else if (data > currentNode) {
        return removeByMaxFn(node.right, data)
    }

  }
  // 最小移除

  // 层序遍历

  // 指针的后序遍历

  // 中序遍历 线索化

  // 判断一个树是否是另一个树的子树

  // 先序加中序 还原树

  // 后序加中序 还原树

  // 树的深度
}
