// call apply bind的用法

// 1 间接调用函数 改变作用域的this值 2 劫持其他对象的方法
var foo = {
  name: "张三",
  logName: function () {
    console.log(this.name);
  },
};

var bar = {
  name: "李四",
};
foo.logName.call(bar);

// 3 两个函数实现继承
function Animal(name) {
  this.name = name;
  this.showName = function () {
    console.log(this.name);
  };
}

function Cat(name) {
  Animal.call(this, name);
}

var cat = new Cat("Black Cat");
cat.showName()
  (
    // 4 为类数组(arguments和nodeList)添加数组方法 push,pop
    function () {
      Array.prototype.push.call(arguments, "王五");
    }
  )("张三", "李四");

// 5 合并数组
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

Array.prototype.push.apply(arr1, arr2);

// 6 求数组最大值
Math.max.apply(null, arr);

// 7 判断字符串类型
Object.prototype.toString.call({});

// bind不兼容ie8 除了返回一个函数 其他和call一样

// bind call apply 原生实现

// call的原生实现
Function.prototype.newCall = function (context, ...parameter) {
  if (typeof context === "object" || typeof context === "function") {
    context = context || window;
  } else {
    context = Object.create(null);
  }

  let fn = Symbol();
  // this指向函数本身
  context[fn] = this;
  // 在context对象上执行的时候 this指向对象本身
  const res = context[fn](...parameter);
  delete context.fn;
  return res;
};

console.log("123", Object.prototype.toString.newCall({}));
// apply实现
Function.prototype.newApply = function (context, parameter) {
  if (typeof context === "object" || typeof context === "function") {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  let fn = Symbol();
  context[fn] = this;
  const res = context[fn](...parameter);
  delete context.fn;
  return res;
};
// bind实现
Function.prototype.newBind = function (context, ...innerArgs) {
  var me = this;
  return function (...finalArgs) {
    return me.call(context, ...innerArgs, ...finalArgs);
  };
};

// 节流
let throttle = function (func, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments);
        // 或者直接func()
        timer = null;
      }, delay);
    }
  };
};

// 防抖
let debounce = function (fn, wait) {
  let timeout = null;
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
      // 或者直接fn()
      timeout = null;
    }, wait);
  };
};

// 创建实例的方法
// 1 字面量
let obj = {
  name: "张三"
};
// 2 Object构造函数
let Obj = new Object();
Obj.name = "张三";
// 3 使用工厂模式创建对象
function createPreson(name) {
  var o = new Object();
  o.name = name;
  return o;
}
var person1 = createPreson("张三");

// 4 使用构造函数创建对象
function Person(name) {
  this.name = name;
}
var person1 = new Person("张三");

// 手动封装一个new运算符
var new2 = function (func) {

  var o = Object.create(func.prototype); // 创建对象
  var k = func.call(o); // 改变this指向，把结果付给k
  if (k && k instanceof Object) {
    return k; // 是， 返回k
  } else {
    return o; // 不是返回构造函数执行的结果
  }
};

// 继承
// 原型链继承
function Animal(name) {
  // 属性
  this.name = name || "Animal";
  // 实例方法
  this.sleep = function () {
    console.log(this.name + "正在睡觉");
  };
}
Animal.prototype.eat = function (food) {
  console.log(this.name + "正在吃" + food);
};

function Cat() {}

Cat.prototype = new Animal()
Cat.prototype.name = 'cat'


// 构造函数继承

function Cat1(name) {
  Animal.call(this)
  this.name = name || 'Tom'
}

// 实例继承
function Cat(name) {
  var instance = new Animal()
  instance.name = name || 'Tom'
  return instance
}

// 拷贝继承
function Cat(name) {
  var animal = new Animal()
  for (var p in animal) {
    Cat.prototype[p] = animal[p]
  }
  Cat.prototype.name = name || 'Tom'
}

// 组合继承
funtion Cat(name) {
  Animal.call(this)
  this.name = name || 'Tom'
}

Cat.prototype = new Animal()
Cat.prototype.constructor = Cat

// 寄生组合式继承

function Cat(name) {
  Animal.call(this)
  this.name = name || 'Tom'
}
(
  function () {
    // 创建一个没有实例的方法类
    var Super = function () {}
    Super.prototype = Animal.prototype
    // 将实例作为子类的原型
    Cat.prototype = new Super()
  }
)()

// es6的 extends继承

class Person {
  constructor(skin, language) {
    this.skin = skin
    this.language = language
  }
  say() {
    console.log('我是父类')
  }
}

class Chinese extends Person {
  constructor(skin, language, positon) {
    super(skin, language)
    this.positon = positon
  }
  aboutMe() {
    console.log(`${this.skin} ${this.language}  ${this.positon}`)
  }
}

// 柯里化
const currying = fn => {
  const len = fn.length
  return function curr(...arg1) {
    if (arg1.length >= len) {
      return fn(...arg1)
    }
    return (...arg2) => curr(...arg1, ...arg2)
  }
}


// 反柯里化
Function.prototype.uncurrying = function () {
  var that = this
  return function () {
    return Function.prototype.call.apply(that, arguments)
  }
}

function sayHi() {
  return "Hello " + this.value + " " + [].slice.call(arguments);
}

let sayHiuncurrying = sayHi.uncurrying();
console.log(sayHiuncurrying({
  value: 'world'
}, "hahaha"));


// 偏函数

function foo(a, b, c) {
  return a + b + c
}

function func(a, b) {
  return foo(a, b, 8)
}

// 对象多级遍历

var parseTreeJSon = function (treeNodes) {
  if (!treeNodes || !treeNodes.length) return;

  for (var i = 0, len = treeNodes.length; i < len; i++) {
    var childs = treeNodes[i].children;
    console.log(treeNodes[i].id)
    if (childs && childs.length > 0) {
      parseTreeJSon(childs)
    }
  }
}

// 数据拦截
let obj = {
    name: '',
    age: '',
    sex: ''
  },
  defaultName = ["这是姓名默认值1", "这是年龄默认值1", "这是性别默认值1"]


Object.keys(obj).forEach(key => {
  Object.defineProperty(obj, key, {
    get() {
      return defaultName
    },
    set(value) {
      defaultName = value
    }
  })
})

// 拦截数组变化的情况
let a = {};
bValue = 1;
Object.defineProperty(a, "b", {
  set: function (value) {
    bValue = value;
    console.log("setted");
  },
  get: function () {
    return bValue;
  }
});

// 多级嵌套对象监听
let info = {};

function observer(obj) {
  if (!obj || typeof obj !== "object") {
    return
  }
  for (var i in obj) {
    definePro(obj, i, obj[i])
  }
}

function definePro(obj, key, value) {
  observer(value)
  Object.defineProperty(obj, key, {
    get: function () {
      return value
    },
    set: function (newval) {
      console.log('检测到变化', newval)
      value = newval
    }
  })
}

// proxy
let handler = {
  get(target, key, receiver) {
    console.log("get", key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    return Reflect.set(target, key, value, receiver);
  }
};
let proxy = new Proxy(obj, handler);
proxy.name = "李四";
proxy.age = 24;

// 数组扁平化

[1, [2, 3]].flat(1)

function flattern(arr) {
  while (arr.some(item => Array.isArray(item)) {
      arr = [].concat(...arr)
    }
    return arr
  }

  // 数组去重

  Array.from(new Set([1, 2, 3, 4, 5, 5]))[...new Set([1, 2, 3, 4, 5, 5])]

  Array.prototype.distinct = function () {
    const map = {}
    const result = []
    for (const n of this) {
      if (!(n in map)) {
        map[n] = 1
        result.push(n)
      }
    }
    return result
  }

  // 排序
  [1, 2, 4, 4].sort((a, b) => a - b)

  // 冒泡排序
  Array.prototype.bubleSort = function () {
    let arr = this,
      len = arr.length;
    for (let outer = len; outer >= 2; outer--) {
      for (let inner = 0; inner <= outer; inner++) {
        if (arr[inner] > arr[inner + 1]) {
          [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]]
        }
      }
    }
  }

  // 选择排序
  Array.prototype.selectSort = function () {
    let arr = this,
      len = arr.length,
      minIndex = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
      minIndex = i
      for (let j = i, len = arr.length; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j
        }
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }

  // 最大值
  Math.max(...[1, 2, 3, 4])
  Math.max.apply(this, [1, 2, 3, 4])[1, 2, 3, 4].reduce((prev, cur) => {
    return Math.max(prev, cur)
  }, 0)

  // 求和
  [1, 2, 3, 4].reduce((prev, cur) => {
    return prev + cur
  }, 0)

  function sum(arr) {
    var len = arr.length
    if (len == 0) {
      return 0
    } else if (len == 1) {
      return arr[0]
    } else {
      return arr[0] + sum(arr.slice(1))
    }
  }

  // 合并
  [1, 2, 3, 4].concat([5, 6])[...[1, 2, 3, 4], ...[4, 5]]
  let arrA = [1, 2],
    arrB = [3, 4]
  Array.prototype.push.apply(arrA, arrB)


  // 事件循环
  // 执行栈在执行完同步任务后，查看执行栈是否为空，如果执行栈为空，就会去执行Task，每一次执行完Task后，都会去检查MicroTask,
  // 若MicroTask里面有任务就全部执行完，然后再执行Task中的任务，如此循环

  // 宏任务 script setTimeOut setInterval setImmediate I/O UI Rendering

  // 微任务 Process.nextTick(node独有) Promise.then MutationObserver Object.observer


  // 以下代码执行的结果
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }
  async function async2() {
    console.log('async2');
  }
  console.log('script start');
  setTimeout(function () {
    console.log('setTimeout');
  }, 0)
  async1();
  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  }).then(function () {
    console.log('promise2');
  });
  console.log('script end');

  // script start

  // async1 start

  // async2

  // promise1

  // script end

  // async1 end

  // promise2

  // setTimeout


  // 几种判断数据类型的优点

  // typeof 无法区分object arr null（null比较特殊 二进制标识类似于对象）

  // instanceof 能够区分 Array Object Function 适用于判断自定义类实例对象 但是Number Boolean String基本数据类型不能判断

  // Object.prototype.toString.call() 精准判断数据类型 缺点写法繁琐不容易记，推荐封装后使用


  // DOM 事件类型

  // dom0: Element.onClick = function() {

  // }
  // 1是在标签内写onclick事件
  // 2是在js写onclick=function(){}函数

  // dom2: element.addEventListener('click', function(){}, false)

  // dom3: element.addEventListener('keyup', function(){}, false)

  // JSON.parse(JSON.stringify({})) 无法处理 undefined 正则表达式 function

  // class与js构造函数的区别

  // 1、箭头函数不能直接命名，不过允许它们赋值给一个变量
  // 2、箭头函数不能用做构造函数，你不能对箭头函数使用new关键字
  // 3、箭头函数也没有prototype属性，箭头函数绑定了词法作用域，不会修改this的指向
  // 4、箭头函数的作用域不能通过.call、.apply、.bind等语法来改变，这使得箭头函数的上下文将永久不变

  // 目前js解决异步的方案有哪些
  // 回调函数 事件监听 发布订阅 promise generator async/await

  // 动态规划

  class MinCoinChange {
    constructor(coins) {
      this.coins = coins
      this.cache = {}
    }
    makeChange(amount) {
      if (!amount) return []
      if (this.cache(amount)) return this.cache[amount]
      let min = [],
        newMin, newAmount
      this.coins.forEach(coin => {
        newAmount = amount - coin
        if (newAmount >= 0) {
          newMin = this.makeChange(newAmount)
        }
        if (newAmount >= 0 &&
          (newMin.length < min.length - 1 || !min.length) &&
          (newMin.length || !newAmount)) {
          min = [coin].concat(newMin)
        }
      })
      return (this.cache[amount] = min)
    }
  }

  // 疑问 动态规划和贪心算法的区别
  // 动态规划是指大问题可以划分为小问题 重叠问题 由小问题的解得出最终解
  // 贪心算法指局部最优解可以推导出最后的最优解

  // 手写柯里化

  function createCurry(fn, args) {
    var len = fn.length
    var args = args || []
    return function () {
      var _args = [...arguments]
      args = args.concat(_args)
      if (args.length < len) {
        return createCurry.call(this, fn, args)
      }
      return fn.apply(this, args)
    }
  }
  // 手写防抖
  function debounce(fn, delay) {
    let timer = null
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
  // 手写节流
  function throttle(fn, delay) {
    let timer = null
    return function (...args) {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, args)
          timer = null
        }, delay)
      }
    }
  }

  // 强缓存 expires 是一个绝对时间 容易受电脑时间影响 cache-control是一个相对时间 

  // 协商缓存 浏览器发送if-modified-since到服务器 服务器查看文件更改过 则返回新的文件 若没有则返回304 同时带上新的last-modified
  // 浏览器 发送if-none-match到服务器 服务器比对tag 若文件tag变化则返回新的资源 否则返回304 返回头有Etag