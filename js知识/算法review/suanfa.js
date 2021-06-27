// 子树

function HasSubtree(pRoot1, pRoot2)
{
    // write code here
    if (pRoot2 == null && pRoot1 == null) {
        return true;
    }
    if (pRoot1 == null && pRoot2 != null) {
        return false;
    }
    if (pRoot1.val == pRoot2.val) {
        return HasSubtree(pRoot1.left, pRoot2.left) && HasSubtree(pRoot1.right, pRoot2.right);
    }
    return false;
    
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


// 给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。
function ListNode(x){
  this.val = x;
  this.next = null;
}


// 1.给一个单链表，判断其中是否有环的存在；

// 2.如果存在环，找出环的入口点；

// 3.如果存在环，求出环上节点的个数；

// 4.如果存在环，求出链表的长度；

// 5.如果存在环，求出环上距离任意一个节点最远的点（对面节点）；

// 6.（扩展）如何判断两个无环链表是否相交；

// 7.（扩展）如果相交，求出第一个相交的节点；


function createLink(num) {
// 创建一个有环的链表
var entryMath = Math.floor(Math.random() * num) + 1;
var entry = null;
var root = new ListNode(1);
var cur = root;
for (var i=2; i<= num; i++) {
  var node = new ListNode(i);
  cur.next = node;
  cur = node;
  if(i == entryMath) {
    entry = node;
  }
}
cur.next = entry;
return root;
}

// console.log(createLink(10));


function EntryNodeOfLoop(pHead)
{
// write code here
var fast = pHead;
var slow = pHead;
// 判断是否有环 关键点是 fast === slow
while (slow != null && fast.next != null) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow.val == fast.val) {
    return true;
  }
}
return false;
}

console.log(EntryNodeOfLoop(createLink(20)));

// 查询入口点




function Stack() {
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.length = length;
  this.clear = clear;

  function push(element) {
    this.dataStore[this.top++] = element;
  }

  function pop() {
    return this.dataStore[--this.top];
  }

  function peek() {
    return this.dataStore[this.top - 1];
  }

  function length() {
    return this.top;
  }

  function clear() {
    this.top = 0;
  }

}

// 队列
function Queue() {
  this.dataStore = [];
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.front = front;
  this.back = back;
  this.toString = toString;
  this.empty = empty;
  this.length = function () {
    return this.dataStore.length
  }

  function enqueue(element) {
    this.dataStore.push(element);
  }

  function dequeue() {
    return this.dataStore.shift();
  }

  function front() {
    return this.dataStore[0];
  }

  function back() {
    return this.dataStore[this.dataStore.length - 1];
  }

  function toString() {
    var retStr = "";
    for (var i = 0; i < this.dataStore.length; ++i) {
      retStr += this.dataStore[i] + "\n";
    }
    return retStr;
  }

  function empty() {
    if (this.dataStore.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}



// 优先队列的操作
// 插入：在优先队列中插入元素，并使队列“有序”
// 删除最大/最小值：删除并返回最大/最小的元素，并使队列“有序”
// 查找最大/最小关键字：查找最大/最小的值


// 实现 插入 删除 查找最大/最小关键字
// 数组	1	n	n
// 链表	1	n	1
// 有序数组	n 或 logn	n	1
// 有序链表	n	1	1
// 二叉搜索树	logn	logn	logn
// 二叉堆	logn	logn	1


// 1.入队 q.push();

// 2.出队 q.pop();

// 3.获取最大的数 q.peek()

// 数组实现优先队列

function ArrayPriorityQueue() {
  this.queue = new Array()
  // 入队
  this.push = function (num) {
    this.queue.push(num)
  }
  // 出队 最大的出队
  this.pop = function () {
    const maxData = findMaxAndIndex()
    if (maxData.maxIndex > -1) {
      this.queue.splice(maxData.maxIndex, 1)
    }
    return maxData.max
  }

  this.peek = function () {
    const maxData = findMaxAndIndex()
    return maxData.max
  }


  function findMaxAndIndex() {
    var result = {
      max: undefined,
      maxIndex: -1
    }
    if (this.queue.length > 0) {
      result.max = this.queue[0]
      result.maxIndex = 0
      for (var i = 1; i < this.queue.length - 1; i++) {
        if (result.max < this.queue[i]) {
          result.max = this.queue[i]
          result.maxIndex = i
        }
      }
    }

    return result
  }

}

// 链表实现优先队列

function PriorityLinkNode(element, priority) {
  this.element = element
  this.priority = priority
  this.next = null
}

function PriorityLink() {
  this.head = new PriorityLinkNode('head', -1)

  // 指向最大权重处
  this.maxPriority = this.head

  this.push = function (node) {
    // 直接插入一个就可以了
    const next = this.head.next
    node.next = next
    this.head.next = node

    if (node.priority > this.maxPriority.priority) {
      this.maxPriority = node
    }
  }
  this.pop = function () {
    // 删除的时候要找到第二大的节点 并将指针指向
    // 单向链表 需要先找到当前节点的前一个
    var previous = findPrevious(this.maxPriority.element)
    const result = this.maxPriority
    previous.next = this.maxPriority.next
    this.maxPriority = findMax()
    return result

  }

  this.peek = function () {
    return this.maxPriority
  }

  function findPrevious(item) {
    var currNode = this.head;
    while ((currNode.next != null) && (currNode.next.element != item)) {
      currNode = currNode.next;
    }
    return currNode;
  }

  function findMax() {
    var currentNode = this.head
    var maxPriority = this.head
    while (currentNode != null) {
      if (currentNode.priority > maxPriority.priority) {
        maxPriority = currentNode
      }
      currentNode = currentNode.next
    }
    return maxPriority
  }
}

// 有序数组实现优先队列
function SortedPriorityQueue() {
  this.queue = new Array()
  // 入队
  this.push = function (num) {
    // this.queue.push(num)

    // 有序数组用二分法查找插入位置

    const insertIndex = findInsertIndex(num)
    this.queue.splice(insertIndex, 0, num)

  }
  // 出队 最大的出队
  this.pop = function () {
    return this.queue.splice(-1, 1)
  }

  this.peek = function () {
    return this.queue[this.queue.length - 1]
  }

  function findInsertIndex(data) {
    var lowwerBound = 0
    var upperBound = this.queue.length - 1

    while (lowwerBound <= upperBound) {
      var mid = Math.floor((lowwerBound + upperBound) / 2)
      if (data < this.queue[mid]) {
        upperBound = mid - 1
      } else if (data > this.queue[mid]) {
        lowwerBound = mid + 1
      } else {

        return mid
      }
    }
    return lowwerBound
  }

}

// 有序链表实现优先队列

function SortedPriorityLinkNode(element, priority) {
  this.element = element
  this.priority = priority
  this.next = null
}

function SortedPriorityLink() {
  this.head = new SortedPriorityLinkNode('head', -1)

  // 指向最大权重处
  this.maxPriority = this.head

  this.push = function (node) {
    // 根据权重寻找插入位置
    var insertPlace = findInsertPlace(node)
    node.next = insertPlace.next
    insertPlace.next = node
  }
  this.pop = function () {
    // 直接取最前面的一个并断开
    var result = this.head.next
    this.head = this.head.next
    return result
  }

  this.peek = function () {
    // 直接取最前面的一个
    return this.head.next
  }

  function findInsertPlace(item) {
    var currNode = this.head.next
    if (currNode) {
      while (currNode.next !== null && currNode.priority >= item.priority && currNode.next.priority >= item.priority) {
        currNode = currNode.next
      }
    }
    return currNode
  }

}

// 二叉搜索数实现优先队列

function Node(data, left, right) {
  this.data = data
  this.left = left
  this.right = right
  this.show = show
  function show() {
    return this.data
  }
}



function PriorityTree() {
  this.root = null

  // 插入
  this.insert = function (data) {

    var node = new Node(data, null, null)

    if (this.root == null) {
      this.root = node
    } else {
      var current = this.root
      var parent
      while (true) {
        parent = current
        if (data < current.data) {
          current = current.left
          if (current == null) {
            parent.left = node
            break
          }
        } else {
          current = current.right
          if (current == null) {
            parent.right = node
            break
          }
        }
      }
    }

  }

  // 先序遍历 根-左-右
  this.preOrder = function () {
    var stack = new Stack()
    var currNode = this.root

    while (currNode || stack.length() > 0) {
      while (currNode) {
        console.log(currNode.show())
        stack.push(currNode)
        currNode = currNode.left
      }
      if (stack.length() > 0) {
        currNode = stack.pop()
        currNode = currNode.right
      }

    }
  }

  // 中序遍历 有辅助栈 左-根-右
  this.inOrder = function () {
    var stack = new Stack()
    var currNode = this.root

    while (currNode || stack.length() > 0) {
      while (currNode) {

        stack.push(currNode)
        currNode = currNode.left
      }
      if (stack.length() > 0) {
        currNode = stack.pop()
        console.log(currNode.show())
        currNode = currNode.right
      }

    }

  }
  // 利用右线索化 + 回溯 不适用辅助栈完成中序遍历
  this.inOrderWithoutStack = function () {

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

  // 后序遍历 左-右-根 
  this.postOrder = function () {
    var stack = new Stack()
    var stackResult = new Stack()
    var currNode = this.root
    // 利用栈的后进先出原理 根-右-左
    while (currNode || stack.length() > 0) {
      while (currNode) {
        stackResult.push(currNode)
        stack.push(currNode)
        currNode = currNode.right
      }
      if (stack.length() > 0) {
        currNode = stack.pop()
        currNode = currNode.left
      }

    }
    while (stackResult.length() > 0) {
      currNode = stackResult.pop()
      console.log(currNode.show())
    }
  }

  this.postOrderByPointer = function () {
    var stack = new Stack()
    var preNode = null
    var currNode = null
    stack.push(this.root)
    while (stack.length() > 0) {
      currNode = stack.peek()

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
  // 层序遍历
  this.layOrder = function () {
    var queue = new Queue()
    queue.enqueue(this.root)
    while (queue.length() > 0) {
      var current = queue.front()
      if (current.left) {
        queue.enqueue(current.left)
      }
      if (current.right) {
        queue.enqueue(current.right)
      }
      console.log(current.show())
      queue.dequeue()
    }
  }

  // 删除
  // 找出权重最大的节点 删除并重整树
  this.pop = function () {
    var preNode = null
    var currNode = this.root
    while (currNode.right) {
      preNode = currNode
      currNode = currNode.right
    }
    preNode.right = null
    return currNode.data
  }

  this.finMax = function () {
    var currNode = this.root

    while (currNode.right) {
      currNode = currNode.right
    }
    return currNode.data
  }

}



var tree = new PriorityTree()


tree.insert(5)
tree.insert(2)
tree.insert(6)
tree.insert(9)
tree.insert(1)
tree.insert(3)
tree.insert(4)
console.log('先序遍历开始')
tree.preOrder()
console.log('中序遍历开始')
tree.inOrder()
console.log('后序遍历开始')
tree.postOrder()
console.log('新后序遍历开始')
tree.postOrderByPointer()
console.log('层序遍历开始')
tree.layOrder()
console.log('线索化中序遍历')
tree.inOrderWithoutStack()
console.log('删除')


// 二叉堆实现优先队列