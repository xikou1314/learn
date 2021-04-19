/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  let numToCaculate = num
  let result = ''
  var quotient = 0

  var base = [1000, 500, 100, 50, 10, 5, 1]
  var cut = [100, 100, 10, 10, 1, 1, 0]
  var cutStr = ['C', 'C', 'X', 'X', 'I', 'I', '']
  var roma = ['M', 'D', 'C', 'L', 'X', 'V', 'I']

  for (var i = 0; i < base.length; i++) {
    quotient = (numToCaculate / base[i]) | 0
    if (quotient >= 0) {
      result += new Array(quotient + 1).join(roma[i])
      numToCaculate = numToCaculate % base[i]
      if (numToCaculate >= (base[i] - cut[i])) {
        result = result + cutStr[i] + roma[i] 
        numToCaculate = numToCaculate - (base[i] - cut[i])
      }
    }
  }
  return result

};
// @lc code=end