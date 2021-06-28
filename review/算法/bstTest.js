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
  function removeByMin() {
    return removeByMinFn()
  }

  function removeByMinFn(node, data) {
    if (node == null) return null
    if (node.data == data) {
      if (data.left == null && node.right == null) {
        return null
      }
      if (node.left == null) {
        return node.right
      }
      if (node.right == null) {
        return node.left
      }
      var minData = findMin(node.right)
      node.data = minData
      node.right = removeByMinFn(node.right, min)
      return node
    } else if (data < node.data) {
      return removeByMinFn(node.left, data)
    } else if (data > node.data) {
      return removeByMinFn(node.right, data)
    }
  }
  // 层序遍历

  function layOrder() {
    var queue = [this.root]
    var currentNode
    var result = []
    while (queue.length > 0) {
      currentNode = queue.shift()
      if (currentNode.left) {
        queue.push(currentNode.left)
      }
      if (currentNode.right) {
        queue.push(currentNode.right)
      }
      result.push(currentNode.data)
    }
    return result
  }

  // 中序遍历 线索化
  function inOrderWithoutStack() {
    var p = this.root
    while (p) {
      var pLeft = p.left
      if (pLeft) {
        // 找到以p为根节点的树的最右孩子
        while (pLeft.right && pLeft.right != p) {
          pLeft = pLeft.right
        }
        // 线索化
        if (pLeft.right == null) {
          pLeft.right = p
          p = p.left
          continue
        } else { // 线索化后已被访问
          pLeft.right = null // 释放指向根节点(祖先)的指针
        }
      }
      console.log(p.show()) // 打印
      p = p.right // 向上回溯或者转向右子树
    }
  }
  // 判断一个树是否是另一个树的子树
  function hasSubtree(root1, root2) {
    if (root1 == null && root2 == null) {
      return true
    }
    if (roo1 == null && root2 != null) {
      return false
    }
    if (root1.data == root2.data) {
      return hasSubtree(roo1.left, root2.left) && hasSubtree(root1.right, root2.right)
    }
    return false
  }
  // 先序加中序 还原树
  function preOrderAndInOrderCreateTree(pre, in) {
    var node = new Node(per[0].data, null, null)
    var midIndex = in.findIndex(node.data)
    node.left = preOrderAndInOrderCreateTree(per.slice(1, midIndex + 1), in .slice(0, midIndex))
    node.right = preOrderAndInOrderCreateTree(pre.slice(midIndex), in .slice(midIndex + 1))
    return node
  }
  // 后序加中序 还原树
  function postOrderAndInOrderCreateTree(post, in) {
    var node = new Node(post[post.length - 1], null, null)
    var midIndex = in.findIndex(node.data)
    node.left = postOrderAndInOrderCreateTree(post.slice(0, midIndex), in.slice(0, midIndex))
    node.right = postOrderAndInOrderCreateTree(post.slice(midIndex, post.length - 1), in.slice(midIndex + 1))
    return node
  }
  // 树的深度
  function deep() {
    var queue = [this.root]
    var deepCount = 0
    while(queue.length > 0) {
      
      var current = [].concat(queue)
      queue = []
      while(current.length > 0) {
        var node = current.shift()
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
      deepCount++
    }
    return deepCount
    
  }
}