// 动态规划
function dynFib(n) {
    var val = [];
    for (var i = 0; i <= n; ++i) {
        val[i] = 0;
    }
    if (n == 1 || n == 2) {
        return 1;
    }
    else {
        val[1] = 1;
        val[2] = 2;
        for (var i = 3; i <= n; ++i) {
            val[i] = val[i - 1] + val[i - 2];
        }
        return val[n - 1];
    }
}

function recurFib(n) {
    if (n < 2) {
        return n;
    }
    else {
        return recurFib(n - 1) + recurFib(n - 2);
    }
}

function iterFib(n) {
    var last = 1;
    var nextLast = 1;
    var result = 1;
    for (var i = 2; i < n; ++i) {
        result = last + nextLast;
        nextLast = last;
        last = result;
    }
    return result;
}

var start = new Date().getTime();
console.log(recurFib(46));
var stop = new Date().getTime();
console.log(" 递归计算耗时 - " + (stop - start) + " 毫秒 ");
console.log();
start = new Date().getTime();
console.log(dynFib(46));
stop = new Date().getTime();
console.log(" 动态规划耗时 - " + (stop - start) + " 毫秒 ");