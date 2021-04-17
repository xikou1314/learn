/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  function balanced(treeNode) {
    if (treeNode == null) return 0
    var leftHeight, rightHeight
    if ((leftHeight = balanced(treeNode.left)) == -1 ||
      (rightHeight = balanced(treeNode.right)) == -1 ||
      (Math.abs(leftHeight - rightHeight) > 1)
    ) {
      return -1
    }

    return Math.max(leftHeight, rightHeight) + 1
  }
  return balanced(root) != -1
};
// @lc code=end