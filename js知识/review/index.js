// call apply bind的用法

// 1 间接调用函数 改变作用域的this值 2 劫持其他对象的方法
var foo = {
    name: '张三',
    logName: function () {
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
    this.showName = function () {
        console.log(this.name)
    }
}

function Cat(name) {
    Animal.call(this, name)
}

var cat = new Cat("Black Cat")
cat.showName()

// 4 为类数组(arguments和nodeList)添加数组方法 push,pop
(function () {
    Array.prototype.push(arguments, '王五')
})('张三', '李四')

// 5 合并数组
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

Array.prototype.push(arr1, arr2)

// 6 求数组最大值
Math.max.apply(null, arr)

// 7 判断字符串类型
Object.prototype.toString.call({})


// bind不兼容ie8 除了返回一个函数 其他和call一样


// bind call apply 原生实现

// call的原生实现
Function.prototype.newCall = function (context, ...parameter) {
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

console.log('123', Object.prototype.toString.newCall({}))
// apply实现
Function.prototype.newApply = function (context, parameter) {
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
// bind实现
Function.prototype.newBind = function (context, ...innerArgs) {
    var me = this
    return function (...finalArgs) {
        return me.call(context, ...innerArgs, ...finalArgs)
    }
}

// 节流
let throttle = function (func, delay) {
    let timer = null
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, arguments)
                // 或者直接func()
                timer = null
            }, delay);
        }
    }
}

// 防抖
let debounce = function (fn, wait) {
    let timeout = null
    return function () {
        if (timeout !== null) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
            // 或者直接fn()
            timeout = null
        }, wait)
    }
}

// 创建实例的方法
// 1 字面量
let obj = {name: '张三'}
// 2 Object构造函数
let Obj = new Object()
Obj.name = '张三'
// 3 使用工厂模式创建对象
function createPreson(name) {
    var o = new Object()
    o.name = name;
    return o
}
var person1 = createPreson('张三')

// 4 使用构造函数创建对象
function Person(name) {
    this.name = name
}
var person1 = new Person('张三')

// 手动封装一个new运算符
var new2 = function(func) {
    var o = Object.create(func.prototype); // 创建对象
    var k = func.call(o); // 改变this指向，把结果付给k
    if (k && k instanceof Object) {
        return k; // 是， 返回k
    } else {
        return o; // 不是返回构造函数执行的结果
    }
}