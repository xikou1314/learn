// var op = ['*', '']
// for(var i=1000; i< 10000; i++) {
//   var c = String(i)
//   for (var j =0; j<op.length; j++) {
//     for (var k=0; k<op.length; k++) {
//       for (var l=0; l<op.length; l++) {
//         var val = c.charAt(3) + op[j] + c.charAt(2) + op[k] +
//         c.charAt(1) + op[l] + c.charAt(0)
//         if (val.length > 4) {
//           if (i == eval(val)) {
//             console.log(val + "=" + i)
//           }
//         }
//       }
//     }
//   }
// }

var symbol = ['#', '(', '+', '-', '*', '/', ')']
var symbolPriority = {
  '#': 0,
  '(': 1,
  '+': 2,
  '-': 2,
  '*': 3,
  '/': 3,
  ')': 4
}
// 如果遇到左括号则直接入栈
// 如果遇到右括号,则弹出站内只到出现左括号为止
// 如果站外操作符的优先级高于站内的优先级则入栈
// 如果栈外的操作符优先级低于或等于栈内的优先级，输出栈内的符号，并入栈栈外的符号
// 中缀表达式遍历完成，但是栈中还有符号存在，一一出栈输出
function operaSymbol(char, symArr, resArr) {
  var lastChar = symArr[symArr.length - 1]
  if (!lastChar) {
    symArr.push(char)
    return
  }
  if (char === '(') {
    symArr.push(char)
  } else if (char === ')') {
    var curChar = symArr.pop()
    while (symArr && curChar != '(') {
      resArr.push(curChar)
      curChar = symArr.pop()
    }
  } else if (symbolPriority[char] > symbolPriority[lastChar]) {
    symArr.push(char)
  } else if (symbolPriority[char] <= symbolPriority[lastChar]) {
    while (lastChar && (symbolPriority[char] <= symbolPriority[lastChar])) {
      var curChar = symArr.pop()
      resArr.push(curChar)
      lastChar = symArr[symArr.length - 1]
    }
    //      operaSymbol(char, symArr, resArr)
    symArr.push(char)
  } else {
    symArr.push(char)
  }
}

function toSuffixExpre(str) {
  var resArr = []
  var symArr = []
  // 用于记录数字
  var substr = ''
  for (var i = 0, len = str.length; i < len; i++) {
    // 判断是否是符号
    if (symbol.includes(str[i])) {
      resArr.push(substr)
      substr = ''
      operaSymbol(str[i], symArr, resArr)
    } else {
      substr += str[i]
      // resArr.push(str[i])
    }
  }
  resArr.push(substr)
  while (symArr.length > 0) {
    var curChar = symArr.pop()
    resArr.push(curChar)
  }
  var result = resArr.join(' ')
  return result
}


var op = ['*', '']

for (var i = 1000; i < 10000; i++) {
  var c = String(i)
  for (var j = 0; j < op.length; j++) {
    for (var k = 0; k < op.length; k++) {
      for (var l = 0; l < op.length; l++) {
        var val = c.charAt(3) + op[j] + c.charAt(2) + op[k] +
          c.charAt(1) + op[l] + c.charAt(0)
        if (val.length > 4) {
          var stack = []
          var reverse = toSuffixExpre(val).split(' ')
          for (var m = 0; m < reverse.length; m++) {
            if (parseFloat(reverse[m]).toString() != "NaN") {
              stack.push(reverse[m])
            } else {
              var num1 = stack.pop()
              var num2 = stack.pop()
              switch (reverse[m]) {
                case '*':
                  stack.push(num2 * num1)
                  break;
                case '/':
                  stack.push(num2 / num1)
                  break;
                case '+':
                  stack.push(num2 + num1)
                  break;
                case '-':
                  stack.push(num2 - num1)
                  break;
              }
            }
          }
          if (i == stack[0]) {
            console.log(val + "=" + i)
          }
        }
      }
    }
  }
}