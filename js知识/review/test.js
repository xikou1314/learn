// 手写apply
Function.prototype.newApply = function (context, args) {
  if (typeof context === "object" || typeof context === "function") {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  var fn = Symbol();
  context[fn] = this;
  var result = context[fn](...args);
  delete context[fn];
  return result;
};
// 手写call
Function.prototype.newCall = function (context, ...args) {
  if (typeof context === "object" || typeof context === "function") {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  var fn = Symbol();
  context[fn] = this;
  var result = context[fn](...args);
  delete context[fn];
  return result;
};
// 手写bind
Function.prototype.newBind = function (context, ...innerArgs) {
  var me = this;
  return function (...finalArgs) {
    return me.call(context, ...innerArgs, ...finalArgs);
  };
};
// 手写节流
const throttle = function (fn, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
};

// 手写防抖
const debounce = function (fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
};

// 手写new
const new2 = function (fn) {
  let o = Object.create(fn.prototype);
  var k = fn.apply(o);
  if (k && typeof k === "object") {
    return k;
  } else {
    return o;
  }
};

// 手写原型链继承
function Animal(name) {
  this.name = name || "animal";
  this.eat = function () {
    console.log(this.name + "eating");
  };
}

function Cat() {}

Cat.prototype = new Animal();
Cat.prototype.sleep = function () {
  console.log(this.name + "sleeping");
};
Cat.prototype.name = "Tom";

// 手写构造函数继承

function Cat(name) {
  Animal.call(this, name);
}

// 手写实例继承

function Cat() {
  var instance = new Animal();
  instance.name = "Tom";
  return instance;
}

// 手写拷贝继承

function Cat() {
  var animal = new Animal();
  for (var key in animal) {
    Cat.prototype[key] = animal[key];
  }
  Cat.prototype.name = "Tom";
}

// 手写组合继承
function Cat(name) {
  Animal.call(this, name);
}

Cat.prototype = new Animal();
cat.prototype.sleep = function () {
  console.log(this.name + "sleeping");
};

// 手写寄生组合式继承
function Cat(name) {
  Animal.call(this, name);
}
(function () {
  var f = function () {};
  f.prototype = new Animal();
  Cat.prototype = new f();
  Cat.prototype.sleep = function () {
    console.log(this.name + "sleeping");
  };
})();

// 手写class继承

class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(this.name + "eating");
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    this.age = "123";
  }
  sleep() {
    console.log(this.name + "sleeping");
  }
}

// 手写柯里化

const currry = function (fn, args) {
  let args = args || [];
  let len = fn.length;

  return function () {
    _args = [...arguments];
    args = args.concat(args1);
    if (args.length < len) {
      return currry.call(this, fn, args);
    }
    return fn.apply(this, args);
  };
};

// 手写反柯里化
const uncurry = function() {
    let that = this
    return function() {
        return Function.prototype.call.apply(that, arguments)
    }
}