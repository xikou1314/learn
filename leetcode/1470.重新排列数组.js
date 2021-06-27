/*
 * @lc app=leetcode.cn id=1470 lang=javascript
 *
 * [1470] 重新排列数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  function getWantedIndex(i) {
    if (i < n) {
      return i * 2
    } else {
      return (i - n) * 2 + 1
    }
  }
  for (let i = 0; i < nums.length; i++) {
    let j = i
    while (nums[i] >= 0) {
      j = getWantedIndex(j);
      let tmp = nums[i];
      nums[i] = nums[j];
      nums[j] = -tmp;
    }

  }

  for(let i=0; i < nums.length; i++) {
    nums[i] = -nums[i]
  }
  return nums
};
// @lc code=end