// 排列组合的基础知识复习
// 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
function jumpFloor(number)
{
    // write code here
    
}
// 暴力法
function climb(i,n) {
    if(i>n) {
        return 0;
    }
    if(i==n) {
        return 1;
    }
    return climb(i+1, n) + climb(i+2, n);
}


// 暴力法优化
function climb1(i,n,memory) {
    if(i>n) {
        return 0;
    }
    if(i==n) {
        return 1;
    }
    if(memory[i] > 0) {
        return memory[i];
    }
    return climb1(i+1,n,memory) + climb1(i+2,n, memory);
}


// 动态规划
function climb2(n) {
    if(n == 1) {
        return 1;
    }
    var result = [];
    result[1] = 1;
    result[2] = 2;
    for (var i=3; i<=n; i++) {
        result[i]  = result[i-1] + result[i-2];
    }
    return result[n];
}

// 动态规划优化

function climb2(n) {
    if(n == 1) {
        return 1;
    }
    var first = 1;
    var seconde = 2;
    for (var i=3; i<=n; i++) {
        var temp = seconde;
        seconde  = first + seconde;
        first = temp;
    }
    return seconde;
}

// 变态跳台阶
function climbStep(n) {
    var first = 1;
	var sum = 1;
 
	while (number >1)
	{
		sum += first;
		first = sum;
		number--;
	}
	return sum;
}


