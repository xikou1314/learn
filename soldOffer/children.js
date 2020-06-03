/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
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