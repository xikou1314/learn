// call apply bind的用法

// 1 间接调用函数 改变作用域的this值 2 劫持其他对象的方法
var foo = {
    name: '张三',
    logName: function() {
        console.log(this.name)
    }
}

var bar = {
    name: '李四'
}
foo.logName.call(bar)

// 3 两个函数实现继承
function Animal(name) {
    this.name = name
    this.showName = function() {
        console.log(this.name)
    }
}

function Cat(name) {
    Animal.call(this, name)
}

var cat = new Cat("Black Cat")
cat.showName()

// 4 为类数组(arguments和nodeList)添加数组方法 push,pop
(function(){
    Array.prototype.push(arguments, '王五')
})('张三', '李四')

// 5 合并数组
let arr1=[1,2,3]
let arr2=[4,5,6]

Array.prototype.push(arr1, arr2)

// 6 求数组最大值
Math.max.apply(null,arr)

// 7 判断字符串类型
Object.prototype.toString.call({})


// bind不兼容ie8 除了返回一个函数 其他和call一样


// bind call apply 原生实现

// call的原生实现
Function.prototype.newCall = function(context, ...parameter) {
    if (typeof context === 'object' || typeof context === 'function') {
        context = context || window
    } else {
        context = Object.create(null)
    }

    let fn = Symbol()
    context[fn] = this
    const res = context[fn](...parameter)
    delete context.fn
    return res
}