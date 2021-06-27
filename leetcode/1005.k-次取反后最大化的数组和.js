/*
 * @lc app=leetcode.cn id=1005 lang=javascript
 *
 * [1005] K 次取反后最大化的数组和
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var largestSumAfterKNegations = function (A, K) {
  // 贪心算法
  // 局部最优解 数组排序
  // 最小的取反 然后在此基础上再次将最小的取反 一直到最后得出来的结果就是最大值

  let maxSum = 0
  for (let i = 1; i <= K; i++) {
    A = A.sort(function (val1, val2) {
      return val1 - val2
    })
    A[0] = -A[0]
  }

  return A.reduce(function (pre, current) {
    return pre + current
  })
};
// @lc code=end
