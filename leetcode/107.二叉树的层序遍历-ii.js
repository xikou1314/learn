/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层序遍历 II
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  if(!root) return []
  let result = []
  let queue = []

  queue.push([root])
  result.push([root.val])
  while(queue.length > 0) {
    let currentLevel = queue.shift()
    let nextLevel = []
    let nextResult = []
    while(currentLevel.length > 0) {
      let current = currentLevel.shift()
      if (current.left) {
        nextLevel.push(current.left)
        nextResult.push(current.left.val)
      }
      if (current.right) {
        nextLevel.push(current.right)
        nextResult.push(current.right.val)
      }
    }
    if (nextLevel.length > 0) {
      queue.push(nextLevel)
      result.push(nextResult)
    }
  
  }
  return result.reverse()

};
// @lc code=end

