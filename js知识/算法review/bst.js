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

  }
  // 中序遍历
  function inOrder() {
    var result = []

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
  // 后序遍历循环
  function postOrderWhile() {

  }
  // 获取最大值
  function getMax() {
    var current = this.root
    while(current.right != null) {
      current = current.right
    }
    return current.data
  }
  // 获取最小值
  function getMin() {
    var current = this.root
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

  }

  // 移除node
  function removeByMax() {

  }

}