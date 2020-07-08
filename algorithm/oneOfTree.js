// 给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。
// 注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。

/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/
function GetNext(pNode)
{
    // write code here
    // while循环的中序遍历
    if (!pNode) {return null}; // 空指针
    var p = null;
    if (pNode.right) { 
      p = pNode.right;
      while(p.left) {
        p = p.left;
      }
    } else { // 不存在右子树
      p = pNode.next;
      if (pNode.next && pNode.next.right == pNode) {
        while(p.next && p.next.right == p) {
          p = p.next;
        }
        if (p.next == null) {
          p = null;
        } else {
          p = p.next;
        }
      }
    }
    return p;
}