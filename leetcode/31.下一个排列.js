/*
 * @lc app=leetcode.cn id=31 lang=javascript
 *
 * [31] 下一个排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  // 第一步 从后向前找第一个相邻的升序对(i,j)，[j,end)是降序

  // 第二步 从后向前 在[j,end)中找到第一个大于i的k,

  // 第三步 将i与k交换位置

  // 第四步 反序[j,end)

  // 第五步 若第一步没有相邻的升序对，则是降序排列 直接进行第四步

  let i = -1;
  let j = nums.length - 1;
  let k = nums.length - 1
  for (; 0 < j; j--) {
    if (nums[j] > nums[j - 1]) {
      //找到相邻的升序对 中断
      i = j - 1;
      break;
    }
  }
  // 找到相邻的升序对
  if (j > 0 ) {
    for (; j <= k; k--) {
      if (nums[i] < nums[k]) {
        // 找到第一个大于i的k 中断
        break;
      }
    }
    // 交换i和k
    [nums[i], nums[k]] = [nums[k], nums[i]]
  }

  // 反序[j,end)

  let m = j
  let n = nums.length - 1

  while(m < n) {
    [nums[m], nums[n]] = [nums[n], nums[m]]
    m++
    n--
  }
};

// @lc code=end
