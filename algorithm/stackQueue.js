// 用两个栈实现一个队列
var stack1 = [];
var stack2 = [];
function push(node)
{
    // write code here
    stack2.forEach(v => {
        stack1.push(v);
    })
    stack2 = [];
    stack1.push(node);
 
}
function pop()
{
    // write code here
    stack1.forEach(v => {
        stack2.push(v);
    })
    stack1 = [];
    return stack2.shift();
}

push('A');
push('B');
push('C');
console.log(pop());
console.log(pop());
push('D');
console.log(pop());
console.log(pop());