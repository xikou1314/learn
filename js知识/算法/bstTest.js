function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

function BST() {
  this.root = null;
  // 插入节点
  function insert(data) {
    // 创建一个新的节点
    var node = new Node(data, null, null);
    // 若根节点为空
    if (this.root == null) {
      this.root = node;
    } else {
      // 根节点不为空
      var currentNode = this.root;
      var parent;
      while (true) {
        parent = currentNode;
        // 若当前data 小于遍历到的节点
        if (data < currentNode.data) {
          // 判断他的左节点是否为空 若为空 则挂到左节点上
          currentNode = currentNode.left;
          if (currentNode == null) {
            parent.left = node;
            break;
          }
        } else {
          // 判断他的右节点是否为空 若为空 则挂到右节点上
          currentNode = currentNode.right;
          if (currentNode == null) {
            parent.right = node;
            break;
          }
        }
      }
    }
  }

  function insert1(data) {
    var node = new Node(data, null, null)
    if (this.root == null) {
      this.root = node
    } else {
      var preNode = null
      var currentNode = this.root
      while (true) {
        preNode = currentNode
        if (data < currentNode.data) {
          currentNode = currentNode.left
          if(currentNode == null) {
            preNode.left = node
            break
          } else {
            currentNode = currentNode.right
            if (currentNode == null) {
              preNode.right = node
              break
            }
          }
        }
      }
    }
  }

  // 查找节点
  
  function find(data) {
    var currentNode = this.root;
    // 从根节点开始遍历 只要不是null就继续
    while (currentNode) {
      if (data == currentNode.data) {
        // 找到 直接返回
        return currentNode;
      } else if (data < currentNode.data) {
        // 比遍历的节点小 指向左节点
        currentNode = currentNode.left;
      } else if (data > currentNode.right) {
        // 比遍历的节点大 指向右节点
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  function find1(data) {
    var currentNode = this.root
    while (currentNode) {
      if (currentNode.data == data) {
        return currentNode
      } else if (data < currentNode.data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }
  }

  // 先序遍历递归
  function preOrder() {
    // 创建结果数组
    var result = [];
    // 调用递归先序遍历方法
    preOrderFn(this.root, result);
    // 返回结果
    return result;
  }

  function preOrderFn(node, result) {
    // 如果node 不为null
    if (node != null) {
      // 把当前节点push到结果数组
      result.push(node.data);
      // 递归左子树
      preOrderFn(node.left, result);
      // 递归右子树
      preOrderFn(node.right, result);
    }
  }

  // 先序遍历循环

  function preOrderWhile() {
    // 借助stack
    var stack = [];
    // 创建结果数组
    var result = [];
    // 将当前currentNode指向root
    var currentNode = this.root;
    while (currentNode || stack.length > 0) {
      // 将左边的节点全入栈
      while (currentNode) {
        result.push(currentNode.data);
        stack.push(currentNode);
        currentNode = currentNode.left;
      }
      // 若左边到头了 则出栈一个 将current指向右节点
      if (stack.length > 0) {
        currentNode = currentNode.pop();
        currentNode = currentNode.right;
      }
    }
    return result;
  }

  function preOrderByWhile() {
    var currentNode = this.root
    var stack = []
    var result = []
    while (currentNode || stack.length > 0) {
      while (currentNode) {
        stack.push(currentNode)
        result.push(currentNode.data)
        currentNode = currentNode.left
      }
      if (stack.length > 0) {
        currentNode = stack.pop()
        currentNode = currentNode.right
      }
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
    // 栈
    var stack = [];
    var result = [];
    // currentNode 指向
    var currentNode = this.root;
    while (currentNode || stack.length > 0) {
      while (currentNode) {
        // 将当前节点入栈并指向左节点
        stack.push(currentNode);
        currentNode = currentNode.left;
      }
      if (stack.length > 0) {
        currentNode = stack.pop();
        // 保存结果
        result.push(currentNode.data);
        currentNode = currentNode.right;
      }
    }
  }

  function inOrderByWhile() {
    var currentNode = this.root
    var stack = []
    var result = []
    while(currentNode ||stack.length > 0) {
      while (currentNode) {
        stack.push(currentNode)
        currentNode = currentNode.left
      }
      if (stack.length > 0) {
        currentNode = currentNode.pop()
        result.push(currentNode.data)
        currentNode = currentNode.right
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
      // 向下遍历中
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
        // 左节点返回
      } else if (currentNode.left == preNode) {
        if (currentNode.right) {
          stack.push(currentNode.right);
        }
        // 右节点返回
      } else {
        result.push(currentNode.data);
        stack.pop();
      }
      // 设置preNode 开启下一次循环
      preNode = currentNode;
    }
  }

  function poseOrderByWhile() {
    var preNode = null
    var stack = [this.root]
    var result = []
    var currentNode = null
    while (stack.length > 0) {
        currentNode = stack[stack.length - 1]
        if (preNode == null || preNode.left == currentNode || preNode.right == currentNode) {
          stack.push(currentNode)
        } else if (currentNode.left == preNode) {
          // 左边返回
          if (currentNode.right) {
            stack.push(currentNode.right)
          }
        } else {
          result.push(currentNode.data)
          stack.pop()
        }
        preNode = currentNode
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

  function removeByMax1(data) {
    return removeByMax1Fn(this.root, data)
  }
  function removeByMax1Fn(node, data) {
    if (node!= null) {
      if (node.data == data) {
        if (node.left == null && node.right == null) {
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
        node.left = removeByMax1Fn(node.left, maxData)
        return node
      } else if (data < node.data) {
        return removeByMax1Fn(node.left, data)
      } else if (data > node.data) {
        return removeByMax1Fn(node.right, data)
      }
    }
    return null
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

  function removeByMin1(data) {
    return removeByMinFn1(this.root, data)
  }

  function removeByMinFn1(node, data) {
    if (node != null) {
      if (node.data == data) {
        if (node.left == null && node.right == null) {
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
        node.right = removeByMinFn1(node.right, minData)
        return node
      } else if (node < node.data) {
        return removeByMinFn1(node.left, data)
      } else if (node > node.data) {
        return removeByMinFn1(node.right, data)
      }
    }
    return null
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

  function layOrder1() {
    var queue = [this.root]
    var result = []
    var curretNode
    while(queue.length > 0) {
      currentNode = queue.shift()

      if (current.left) {
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