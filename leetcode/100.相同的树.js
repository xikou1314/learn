/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  let pQueue = []
  let qQueue = []
  if (q === null && p === null ) {
    return true
  } else if ((!p && q) || (!q && p)) {
    return false
  }
  pQueue.push(p)
  qQueue.push(q)
  while (qQueue.length > 0 && pQueue.length > 0) {
    let currentp = pQueue.pop()
    let currentq = qQueue.pop()
    if (currentp.val !== currentq.val) {
      return false
    }
    if (currentp.left !== null && currentq.left !== null ) {
      pQueue.push(currentp.left)
      qQueue.push(currentq.left)
    } else if ((currentp.left === null && currentq.left) || (currentq.left === null && currentp.left)) {
      return false
    }

    if (currentp.right !== null && currentq.right !== null ) {
      pQueue.push(currentp.right)
      qQueue.push(currentq.right)
    } else if ((currentp.right === null && currentq.right) || (currentq.right === null && currentp.right)) {
      return false
    }
  }

  if (pQueue.length !== qQueue.length) {
    return false
  }
  return true

};
// @lc code=end 

