function ListNode(x){
    this.val = x;
    this.next = null;
}
function FindKthToTail(head, k)
{
  // write code here
  var temp = [];
  var node = head.next;
  do {
    temp.push(node);
    node = node.next;
  } while (node);

  var length = temp.length;
  return temp[length - k];
}

var head = new ListNode();
var node1 = new ListNode(1);
var node2 = new ListNode(2);
var node3 = new ListNode(3);

head.next = node1;
node1.next = node2;
node2.next = node3;
console.log(FindKthToTail(head, 3));