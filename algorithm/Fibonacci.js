// 动态规划实现斐波那契数列
function feibo(n) {
    var result = [];
    for(var i=1; i<=n; i++) {
        if(i<=2) {
            result[i] = 1;
        } else {
            result[i] = result[i-1] + result[i-2]
        }
    }
    return result[n];
}
console.log(feibo(16))