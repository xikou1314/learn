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