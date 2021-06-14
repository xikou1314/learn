/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {

  if (root == null) {
    return false
  }

  var queNode = []
  var queVal = []
  queNode.push(root)
  queVal.push(root.val)
  while(queNode.length > 0) {
    var current = queNode.shift()
    var temp = queVal.shift()
    if (current.left == null && current.right == null) {
      if (temp == targetSum) {
        return true
      }
      continue
    }
    if (current.left != null) {
      queNode.push(current.left)
      queVal.push(temp + current.left.val)
    } 
    if (current.right != null) {
      queNode.push(current.right)
      queVal.push(temp + current.right.val)
    } 
  }
  return false
};
// @lc code=end

