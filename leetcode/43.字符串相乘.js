/*
 * @lc app=leetcode.cn id=43 lang=javascript
 *
 * [43] 字符串相乘
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  let ret = new Array(num1.length + num2.length).fill(0);
  for (let i = 0; i < num1.length; i++) {
    for (let j = 0; j < num2.length; j++) {
      //x为个位，y为十位
      let x = Number(num1[i]) * Number(num2[j]);
      let y;
      if (x < 10) {
        y = 0;
      } else {
        let temp = x;
        x = x % 10;
        y = (temp - x) / 10;
      }
      //找到对应位，相加
      ret[i + j] = ret[i + j] + y;
      ret[i + j + 1] = ret[i + j + 1] + x;
    }
  }
  //考虑每个位上的满十进位
  for (let i = ret.length - 1; i > 0; i--) {
    if (ret[i] > 9) {
      let temp = ret[i];
      ret[i] = ret[i] % 10;
      ret[i - 1] = ret[i - 1] + (temp - ret[i]) / 10;
    }
  }
  //推出前导零
  while (ret[0] === 0) ret.shift();
  return ret.length ? ret.join('') : '0';
};
// @lc code=end