// 二叉查找树

function Node(data, left, right) {
  this.data = data
  this.left = left
  this.right = right
  this.show = show
  function show() {
    return this.data
  }
}

function BST() {
  this.root = null

  // 插入节点
  function insert(data) {
    var newNode = new Node(data)
    if (this.root == null) {
      this.root = newNode
    } else {
      // 从根节点找一个合适的地方插入数据
      var current = this.root
      var parent
      while(true) {
        parent = current
        if (data < current.data) {
          current = current.left
          if(current == null) {
            parent.left = newNode
            break
          }
        } else {
          current = current.right
          if(current == null) {
            parent.right = newNode
            break
          }
        }
      }
    }
  }
  // 查找节点
  function find(data) {
    // 从根节点开始查找
    var current = this.root
    while(current != null) {
      if (current.data == data) {
        return current
      } else if (data < current.data) {
        current = current.left
      } else {
        current = current.right
      }
    }
    return null
  }
  // 先序遍历
  function preOrder() {
    var result = []
    perOrderFn(this.root, result)
    return result
  }
  function preOrderFn(node, result) {
    if (node != null) {
      result.push(node.data)
      preOrderFn(node.left, result)
      preOrderFn(node.right, result)
    }
  }

  // 先序遍历循环
  function preOrderWhile() {
    var stack = []
    var currentNode = this.root
    while(currentNode || stack.length > 0) {  
      while(currentNode) {
        console.log(currentNode.show())
        stack.push(currentNode)
        currentNode = currentNode.left
      }
      if (stack.length > 0) {
        currentNode = stack.pop()
        currentNode = currentNode.right
      }

    }
  }
  // 中序遍历
  function inOrder() {
    var result = []
    inOrderFn(this.root, result)
    return result
  }
  function inOrderFn(node, result) {
    if (node != null) {
      inOrderFn(node.left, result)
      result.push(node.data)
      inOrderFn(node.right, result)
    }
  }
  //中序遍历循环
  function inOrderWhile() {
    var stack = []
    var currentNode = this.root
    while(currentNode || stack.length > 0) {
      while(currentNode) {
        stack.push(currentNode)
        currentNode = currentNode.left
      }
      if (stack.length > 0) {
        currentNode = stack.pop()
        console.log(currentNode.data)
        currentNode = currentNode.right
      }
    }
  }
  // 后序遍历
  function postOrder() {
    var result = []
    postOrderFn(this.root, result)
    return result
  }
  function postOrderFn(node, result) {
    if (node != null) {
      postOrderFn(node.left, result)
      postOrderFn(node.right, result)
      result.push(node.data)
    }
  }
  // 后序遍历循环 等价于先序遍历的逆向操作
  function postOrderWhile() {
    var stack = []
    var stackResult = []
    var currentNode = this.root
    while(currentNode || stack.length > 0) {
      while(currentNode) {
        stack.push(currentNode)
        stackResult.push(currentNode)
        currentNode = currentNode.left
      }
      if (stack.length > 0) {
        currentNode = stack.pop()
        currentNode = currentNode.right
      }
    }

    while(stackResult.length > 0) {
      var node = stackResult.pop()
      console.log(node.data)
    }

  }
  // 获取最大值
  function getMax(node) {
    var current = node
    while(current.right != null) {
      current = current.right
    }
    return current.data
  }
  // 获取最小值
  function getMin(node) {
    var current = node
    while(current.left != null) {
      current = current.left
    }
    return current.data
  }
  // 移除node
  function removeByMin(data) {
    this.root = removeNodeByMin(this.root, data)
  }

  function removeNodeByMin(node, data) {
    // 节点为空
    if (node == null) {
      return null
    }

    if (data == node.data) {
      // 没有子节点
      if (node.left == null && node.right == null) {
        return null
      }
      // 左子节点为空
      if (node.left == null) {
        return node.right
      }
      // 右子节点为空
      if (node.right == null) {
        return node.left
      }

      // 有两个子节点的节点

      // 获得右边的最小值
      var tempNode = getMin(node.right)
      node.data = tempNode.data
      // 删除右边的最小值
      node.right = removeNodeByMin(node.right, tempNode.data)
      return node
    }  else if (data < node.data) {
      // 在左子树上去删除
      node.left = removeNodeByMin(node.left, data)
      return node
    } else {
      node.right = removeNodeByMin(node.right, data)
      return node
    }

  }

  // 移除node
  function removeByMax(data) {
    this.root = removeNodeByMax(this.root, data)
  }

  function removeNodeByMax(node, data) {
    // node节点为null
    if (mode == null) {
      return null
    }

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

      // 有两个子节点
      var tempNode = getMax(node.left)
      node.data = tempNode.data
      node.left = removeNodeByMax(node.left, tempNode.data)
      return node
    } else if (data < node.data) {
      node.left = removeNodeByMax(node.left, data)
      return node
    } else {
      node.right = removeNodeByMax(node.right, data)
      retrun node
    }
  }

  // 层序遍历
  this.layOrder = function() {
    var queue = []
    queue.push(this.root)
    while(queue.length > 0) {
      var current = queue.shift()
      if (currrent.left) {
        queue.push(current.left)
      }
      if (current.right) {
        queue.push(current.right)
      }
      console.log(current.show())
    }
  }


  // 一些特殊的玩法

  // 通过指针进行后序遍历
  function postOrderByPointer() {
    var stack = []
    var preNode = null
    var currNode = null
    stack.push(this.root)
    while(stack.length > 0) {
      currNode = stack[stack.length - 1]
      if (preNode == null || preNode.left == currNode || preNode.right == currNode) {
        if (currNode.left) {
          stack.push(currNode.left)
        } else if (currNode.right) {
          stack.push(currNode.right)
        }
      } else if (currNode.left == preNode) {
        if (currNode.right) {
          stack.push(currNode.right)
        }
      } else {
        console.log(currNode.show())
        stack.pop()
      }
      preNode = currNode
    }
  }

  // 中序遍历利用线索化
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
        } else {   // 线索化后已被访问
          pLeft.right = null // 释放指向根节点(祖先)的指针
        }
      }
      console.log(p.show()) // 打印
      p = p.right // 向上回溯或者转向右子树
    }
  }

  //  判断一个树是否是另一个树的子树

  function hasSubtree(proot1, proot2) {
    if (proot1 === null && proot2 === null) {
      return true
    }

    if (proot1 === null && proot2 !== null) {
      return false
    }

    if (proot1.data === proot2.data) {
      return hasSubtree(proot1.left, proot2.left) && hasSubtree(proot1.right, proot2.right)
    }
    return false
  }

  // 还原树 先序 中序

  // 还原树 后序 中序

  // 树的深度

}

function reConstructBinaryTree(pre, vin)
{
    // 通过先序和中序遍历还原二叉树
    // 分析遍历的特点 先序遍历 第一个元素是根节点
    // 中序遍历 根节点在中间 根节点的左边是左子树 根节点的右边是右子树
    if(pre.length <= 0) {
        return null;
    }
    var node = new TreeNode(pre[0]);
    var nodeindex = vin.indexOf(pre[0]);
    // 取出左子树
    // 取出右子树
    node.left = reConstructBinaryTree(pre.slice(1,nodeindex+1),vin.slice(0,nodeindex));
    node.right = reConstructBinaryTree(pre.slice(nodeindex+1),vin.slice(nodeindex+1));

    return node;
}

function reConstructBinaryTree1(post, vin)
{
    // 通过后序和中序遍历还原二叉树
    // 分析遍历的特点 后序遍历 最后一个元素是根节点
    // 中序遍历 根节点在中间 根节点的左边是左子树 根节点的右边是右子树
    var length = post.length;

    if(length <= 0) {
        return null;
    }
  
    var node = new TreeNode(post[length]);
    var nodeindex = vin.indexOf(post[length]);
    // 取出左子树
    // 取出右子树
    node.left = reConstructBinaryTree1(post.slice(0,nodeindex),vin.slice(0,nodeindex));
    node.right = reConstructBinaryTree1(post.slice(nodeindex, length - 1),vin.slice(nodeindex+1));

    return node;
}

// 树的深度
function TreeDepth(pRoot)
{

    // write code here
    if(!pRoot) return 0;
    var deep = 0;
    var temp = [];
    temp.push(pRoot);

    while(temp.length>0) {
        deep ++;
        var size = temp.length;
        var current = []
        for(var i=0; i<size; i++) {
            if(temp[i].left) {
                current.push(temp[i].left);
            } else if(temp[i].right) {
                current.push(temp[i].right);
            }
        }
        temp = [].concat(current);
    }

    return deep;
}