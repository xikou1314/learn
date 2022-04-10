// 浅克隆

const shallClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop]
      }
    }
    return cloneTarget
  }
  return target
}

// 手动实现一个深拷贝简易版
function deepClone(target) {
  if (target === null) return null
  if (typeof target !== 'object') return target

  const cloneTarget = Array.isArray(target) ? [] : {}
  for(let prop in target) {
    if(target.hasOwnProperty(prop)) {
      cloneTarget[prop] = target[prop]
    }
  }
  return cloneTarget
}

// 手动实现一个深克隆(考虑日期/正则等特殊对象和解决循环引用情况)
const isObject = (target) => {
  (typeof target === 'object' || typeof target === 'function') && target !== null
}

function deepClone(target, map = new Map()) {
  // 先判断该饮用类型是否被 拷贝过
  if(map.get(target)) {
    return target
  }
  // 获取当前值的构造函数： 获取它的类型
  let constructor = target.constructor
  // 检测当前对象target是否与 正则、日期格式对象匹配
  if(/^(RegExp|Date)$/i.test(constructor.name)) {
    return new constructor(target); // 创建一个新的特殊对象(正则/日期类)的实例
  }
  if(isObject(target)) {
    map.set(target, true)
    const cloneTarget = Array.isArray(target) ? [] : {}
    for(let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map)
      }
    }
    return cloneTarget
  }
  return target
}
// 手写instanceof
function _instanceof(instanceObj, classFunc) {
  let classFuncPrototype = classFunc.proptype
  let proto = instanceObj.__proto__
  while(true) {
    if (proto === null) {
      return false
    }
    if (proto === classFuncPrototype) {
      return true
    }
    proto = proto.__proto__
  }
}
// 手写instanceof 优化版
function _instanceof(instance, classFunc) {
  let classFunc = classFunc.proptype; // 取得当前类的原型
  let proto = Object.getPrototypeOf(instance)
  while(true) {
    if(proto === null) {
      return false
    }
    if(proto === classFunc) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}

// 手写防抖函数 以最后一次触发为准

function debounce(func, wait = 500, immediate = false) {
  let timer = null
  return function(...params) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.call(this, ...params)
      timer = null
    }, wait)
  }
}

// 手写防抖函数 以第一次触发为准

function debounce(func, wait = 500, immediate = true) {
  let timer = null
  return function(...params) {
    let now = immediate && !timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
    }, wait)
    now ? func.call(this, ...params) : null
  }
}

// 手写节流函数
function throttle(func, wait) {
  let timer = null
  return function(...params) {
    if(!timer) {
      timer = setTimeout(() => {
        func.call(this, ...params)
        timer = null
      })
    }
  }
}

// 手写create

Object.mycreate = function create(prototype) {
  if (prototype === null || typeof prototype !== 'object') {
    throw new TypeError('Object prototype may be an Object')
  }
  function Temp() {}
  Temp.prototype = prototype
  return new Temp()
}

// 手动实现内置的new的原理 简化版

function _new(Func, ...args) {
  let obj = {}
  obj.__proto__ = Func.proptype

  let result = Func.call(obj, ...args)
  if(result !== null && /^(object|function)$/.test(typeof result)) {
    return result
  }
  return obj
}

// 手写new  优化版

function _new(Func, ...args) {
  let obj = Object.create(Func.proptype)
  let result = Func.call(obj, ...args)
  if (result !== null && /^(object|function)$/.test(typeof result)) {
    return result
  }
  return obj
}

// 手动实现call方法

Function.prototype.mycall = function(content, ...args) {
  content = content ? Object(content) : window
  let that = this
  const fnc = Symbol()
  content[fnc] = that
  const result =  content[fnc](...args)
  delete content[fnc]
  return result
}

Function.prototype.myapply = function(content, args) {
  content = content ? Object(content) : window
  let that = this
  const fnc = Symbol()
  content[fnc] = that
  const result =  content[fnc](...args)
  delete content[fnc]
  return result
}

Function.proptype.mybind = function(content, ...arg1) {
  let that = this
  return function(...arg2) {
    return that.call(content,...[...arg1,...arg2] )
  }
}

// 手写数组扁平化

Array.prototype.myFlat = function() {
  let newArr = []
  let wait = [this]
  while(wait.length > 0) {
    let current = wait.shift()
    current.forEach(item => {
      if(Array.isArray(item)) {
        wait.push(item)
      } else {
        newArr.push(item)
      }
    })
  }
  return newArr
}

// 基于generator函数实现async/await原理
function readFile(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(file)
    }, 1000);
  })
}

function asyncFunc(generator) {
  const iterator = generator() // 接下来要执行next
  // data为第一次执行之后的返回结果，用于传给第二次执行
  const next = (data) => {
    let { value, done } = iterator.next(data) // 第二次执行，并接收第一次的请求结果 data
    if (done) return // 执行完毕(到第三次)直接返回
    value.then(data => {
      next(data) // 当第一次value 执行完毕且成功时，执行下一步(并把第一次的结果传递给下一步)
    })
  }
  next()
}

asyncFunc(function* () {
  // 生成器函数：控制代码一步步执行
  let data = yield readFile('a.js') // 等这一步骤执行成功之后，再往下走，没执行完的时候，直接返回
  data = yield readFile(data + 'b.js')
  return data
})

// 手写基于promise封装ajax

function ajax(url, method) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(url, method, true)
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if(xhr.status === 200) {
          resolve(xhr.responseText)
        } else if(xhr.status === 404) {
          reject(new Error('404'))
        }
      } else {
        reject('请求数据失败')
      }
    }
    xhr.send(null)
  })
}

// 手动实现jsonp跨域
let script = document.createElement('script')
script.src = 'http://www.baidu.cn/login?username=JasonShu&callback=callback';

document.body.appendChild(script)
function callback(res) {
  console.log(res)
}

// 手动实现sleep

function sleep(wait) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, wait)
  })
}

async function sleepTest() {
  await sleep(300)
}

// 手动实现数组的reduce

Array.prototype.myreduce = function(fnc, pre) {
  let that = this
  for(let i=0; i < that.length; i++) {
    if(typeof pre === 'undefined') {
      pre = fnc(that[i], that[i+1], i+1, that)
      i++
    } else {
      pre = fnc(pre, that[i], i, that)
    }
  }
  return pre
}

// 手动实现curry

function curry(fnc) {
  let length = fnc.length
  return function(...args) {
    if (args.length >= length) {
      return fnc(...args)
    } else {
      return function(...arg1) {
        return curry(...args.concat(arg1))
      }
    }
  }
}

// 手写一个寄生组合继承
function Parent() {
  this.name = '123'
}
function Child() {
  Parent.call(this)
  this.age = 12
}

function content(prototype) {
  function F(){}
  F.prototype = prototype
  return new F()
}
pro = content(Parent.prototype)
Child.prototype = pro
pro.constructor = Child
const child = new Child()

// 手写发布订阅模式

const mediator = {
  map: {},
  subscribe(key, cb) {
    if(this.map[key]) {
      this.map[key].push(cb)
    } else {
      this.map[key] = [cb]
    }
  },
  emit(key, info) {
    let cbs = this.map[key] || []
    cbs.forEach(cb => {
      cb(info)
    })

  },
  remove(key, cb) {
    let cbs = this.map[key] || []
    for(let i=0; i<cbs.length; i++) {
      if (cbs[i] === cb) {
        cbs.splice(i, 1)
      }
    }
  }
}

// 手写观察者模式
class Listener {
  constructor() {
    this.listeners = []
  }
  add(observer) {
    this.listeners.push(observer)
  }
  notify(info) {
    this.listeners.forEach(v => v.update(info))
  }
}
class Observer {
  constructor() {

  }
  update(info) {
    console.log('执行update', info)
  }
}

// 手动实现Object.freeze
function myfreeze(obj) {
  if (obj instanceof Object) {
    Object.seal(obj)
    for(let key in obj) {
      if(obj.hasOwnProperty(key)) {
        Object.defineProperties(obj, key, {
          writable: false
        })
      }
      myfreeze(obj[key])
    }
  }
}

// 手动实现promise.all

function isPromise(val) {
  return typeof val.then === 'function'
}

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let arr = []
    let index = 0
    const processData = (key, data) => {
      arr[key] = data
      if (++index === promises.length) {
        resolve(arr)
      }
    }
    for(let i=0; i<promises.length; i++) {
      let result = promises[i]
      if(isPromise(result)) {
        result.then(data => {
          processData(i, data)
        }, reject)
      } else {
        processData(i, data)
      }
    }
  })
}

// 手写Promise.allSettled
function isPromise(val) {
  return typeof val.then === 'function'
}
Promise.allSettled = (promises) => {
  return new Promise((resolve, reject) => {
    let arr = []
    let index = 0
    const setData = (key,data) {
      arr[key] = data
      if (++index === promises.length) {
        resolve(arr)
      }
    }
    for(let i=0; i<promises.length; i++) {
      let result = promises[i]
      if (isPromise(result)) {
        result.then(data => {
          setData({ status: 'fulfilled', value: data })
        }, err => {
          setData({ status: 'rejected', value: err })
        })
      } else {
        setData({ status: 'fulfilled', value: result })
      }
    }
  })
}

// 手写Promise.prototype.finally

Promise.prototype.finally = function(callback) {
  return this.then((data) => {
    return Promise.resolve(callback()).then(() => data)
  }, err => {
    return Promise.resolve(callback()).then(() => {
      throw err
    })
  })
}