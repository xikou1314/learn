// 用两个栈实现一个队列
var stack1 = [];
var stack2 = [];
function push(node)
{
    while(stack2.length) {
        stack1.push(stack2.pop())
    }
    stack1.push(node);
 
}
function shift()
{
    while(stack1.length) {
        stack2.push(stack1.pop())
    }
    return stack2.pop();
}

push('A');
push('B');
push('C');
console.log(shift());
console.log(shift());
push('D');
console.log(shift());
console.log(shift());