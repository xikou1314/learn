import Helper from './createTree.js';
// while 按层级遍历
// 从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。
function Print(pRoot)
{
    // write code here
    var result = [];
    var out = [[pRoot]];
    while(out.length != 0) {
        // 拿出外层
        var curArr = out.pop();
        var next = [];
        var curVal = [];
        for (var i=0; i<curArr.length; i++) {
            // 保存当前层的结果
            curVal.push(curArr[i].val);
            // 下一层 压入一个新数组
            if(curArr[i].left) {
                next.push(curArr[i].left);
            }
            if(curArr[i].right) {
                next.push(curArr[i].right);
            }
        }
        // 当前层的下一层全保存在next中
        // 将next推入到out
        if(next.length > 0) {
            out.push(next);
        }
        if (curVal.length > 0) {
            result.push(curVal);
        }

    }
    for(var j=0; j<result.length; j++) {
        console.log(result[j].join(' '));
    }
}

var arr = [10,5,15,3,7,13,18];

var root = Helper.createTree(arr);

Print(root);