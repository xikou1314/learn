/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
 * @return {number}
 */
var minDepth = function(root) {

  function minTreeHeight(treeNode) {
    if (treeNode == null) return 0
    var leftHeight = minTreeHeight(treeNode.left)
    var rightHeight = minTreeHeight(treeNode.right)
    if (leftHeight > 0 && rightHeight > 0) {
      return Math.min(leftHeight, rightHeight) + 1
    } else {
      return (leftHeight || rightHeight) + 1
    }
    
  }

  if (root == null) return 0

  return minTreeHeight(root)
};
// @lc code=end

