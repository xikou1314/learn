// // 原型链继承
// function Parent(aa) {
//   this.name = "aa";
//   this.aa = aa
// }
// Parent.prototype.gender = "male";

// function Child() {
//   this.age = 12;
// }

// Child.prototype = new Parent('test');
// var boy = new Child();
// console.log(boy.name);
// console.log(boy.age);
// console.log(boy.gender);
// console.log(boy.aa)

// // 借用构造函数继承

// function Parent1(name) {
//   this.name = name;
// }

// function Child1(name) {
//   Parent1.call(this, name);
// }

// var boy1 = new Child('bb');
// console.log(boy1.name);

// // 组合式继承
// function Parent2(name) {
//   this.name = name;
// }

// function Child2(name) {
//   Parent2.call(this, name);
// }

// Child2.prototype = new Parent2();
// var boy2 = new Child2('cc');
// console.log(boy2.name);

// // 原型式继承 只是对原型链继承的一个封装 目的 减少父类实例化的开销
// function Parent3(name) {
//   this.name = name;
// }
// function content(obj) {
//   function F(){};
//   F.prototype = obj;
//   return new F();
// }
// var sup = new Parent3('dd');
// var boy3 = content(sup);
// console.log(boy3.name);

// // 寄生式继承 寄生于原型式继承扩展自己的属性和方法
// function Parent4 (name){
//   this.name = name;
// }
// function content1(obj) {
//   function F() {};
//   F.prototype = obj;
//   return new F();
// }

// function subproject(obj) {
//   var sub = content(obj);
//   sub.age = "12";
//   return sub;
// }

// var parent4 = new Parent4('ff');
// var boy4 = subproject(parent4);
// console.log(boy4.age);
// console.log(boy4.name);

// // 寄生组合式继承
// function Parent5() {
//   this.name = '张三';
// }

// // 寄生
// function content2(obj) {
//   function F() {};
//   F.prototype = obj;
//   return new F();
// }
// var con = content2(Parent5.prototype);
// // 组合
// function Sub() {
//   Parent5.call(this);
// }
// Sub.prototype = con;
// con.constructor = Sub;
// var sub1 = new Sub();
// console.log(sub1.name);

// // class继承
// class Parent6 {
//   constructor(value) {
//     this.val = value
//   }
//   getValue() {
//     console.log(this.val)
//   }
// }
// class Child6 extends Parent6 {
//   constructor(value) {
//     super(value)
//     this.val = value
//   }
// }
// let child6 = new Child6(1);
// child6.getValue() // 1child instanceof Parent // true

// 原型链继承

// 将子的原型设置为父的一个实例 缺点
function Parent1() {
  this.name = "parent";
}

function Sub1() {
  this.age = 11;
}

Sub1.prototype = new Parent1();
var sub1 = new Sub1();
console.log(sub1.name, sub1.age);
console.log(sub1 instanceof Sub1);
console.log(sub1 instanceof Parent1);

// 构造函数继承
function Parent2() {
  this.name = "parent";
}

function Sub2() {
  Parent2.call(this);
  this.age = "11";
}
var sub2 = new Sub2();
console.log(sub2.name, sub2.age);
console.log(sub2 instanceof Parent2);
console.log(sub2 instanceof Sub2);

// 组合式继承 组合原型链继承和构造函数继承
function Parent3() {
  this.name = "parent";
}

function Sub3() {
  Parent3.call(this);
  this.age = 11;
}

Sub3.prototype = new Parent3();
var sub3 = new Sub3();
console.log(sub3.name, sub3.age);
console.log(sub3 instanceof Parent3);
console.log(sub3 instanceof Sub3);

// 原型继承 前提是已有父类的一个实例 借用空对象封装原型链继承 解决每次都要new 父类实例的消耗

var obj = {
  name: "parent",
};
function content(o) {
  var f = function () {};
  f.prototype = o;
  return new f();
}

var sub4 = content(obj);

console.log(sub4.name);

// 寄生继承 在原型继承的基础上 可以自己定义属性和方法
var obj1 = {
  name: "parent",
};

function content1(o) {
  function f() {}
  f.prototype = o;
  return new f();
}
function createObject(o) {
  var obj = content1(o);
  obj.age = 11;
  return obj;
}

var sub5 = createObject(obj1);
console.log(sub5.name, sub5.age);

// 寄生组合继承

function Parent6() {
  this.name = "parent";
}

function Sub6() {
  Parent6.call(this);
  this.age = 11;
}

function content2(o) {
  function f() {}
  f.prototype = o;
  return new f();
}

function inherite(SubClass, SupClass) {
  // 寄生父亲的构造函数 创建一个空的实例 
  // 用空的实例来实现组合继承 注意call依然使用的是父亲的构造函数
  var o = content2(SupClass.prototype);
  SubClass.prototype = o;
  o.constructor = SubClass;
}

inherite(Sub6, Parent6);

var sub6 = new Sub6();

console.log(sub6.name, sub6.age);
console.log(sub6 instanceof Parent6);
console.log(sub6 instanceof Sub6);

// class继承

class Parent7 {
  constructor() {
    this.name = "parent";
  }
}

class Sub7 extends Parent7 {
  constructor() {
    super();
    this.age = 11;
  }
}

var sub7 = new Sub7();
console.log(sub7.name, sub7.age);
// 寄生组合式继承
function Sup() {
  this.name = "ssss";
}

function Child() {
  Sup.call(this);
  this.age = 11;
}

function contentx(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var p = contentx(Sup.prototype);

Child.prototype = p;
p.constructor = Child;

Object.prototype.mix = function () {
  var i = 0,
    len = arguments.length,
    arg;
  for (; i < len; i++) {
    arg = arguments[i];
    for (var property in arg) {
      this[property] = arg[property];
    }
  }
};
