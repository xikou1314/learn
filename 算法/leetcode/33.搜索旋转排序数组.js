/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // 先要确定旋转的位置 怎么样在最快的情况下确定
  let i = 0;
  for (; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      // 找到旋转的位置
      break;
    }
  }
  // 比最大值大 剪枝 比最小值小 剪枝
  if (target > nums[i] || target < nums[i + 1]) {
    return -1;
  } else if (target === nums[i]) {
    return i;
  } else if (target === nums[i + 1]) {
    return i + 1;
  } else {
    let lowerBound;
    let upperBound;
    if (target < nums[i]) {
      // 在[0, i]中进行二分查找
      lowerBound = 0;
      upperBound = i;
      while (lowerBound <= upperBound) {
        let mid = Math.floor((lowerBound + upperBound) / 2);
        if (target < nums[mid]) {
          upperBound = mid - 1;
        } else if (target > nums[mid]) {
          lowerBound = mid + 1;
        } else {
          return mid;
        }
      }
    }

    if (target > nums[i + 1]) {
      // 在(i, length -1]中进行二分查找
      lowerBound = i + 1;
      upperBound = nums.length - 1;
      while (lowerBound <= upperBound) {
        let mid = Math.floor((lowerBound + upperBound) / 2);
        if (target < nums[mid]) {
          upperBound = mid - 1;
        } else if (target > nums[mid]) {
          lowerBound = mid + 1;
        } else {
          return mid;
        }
      }
    }
    return -1;
  }
};
// @lc code=end
