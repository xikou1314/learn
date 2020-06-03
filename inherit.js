// 原型链继承
function Parent() {
  this.name = "aa";
}
Parent.prototype.gender = "male";

function Child() {
  this.age = 12;
}

Child.prototype = new Parent();
var boy = new Child();
console.log(boy.name);
console.log(boy.age); 
console.log(boy.gender);

// 借用构造函数继承

function Parent1(name) {
  this.name = name;
}

function Child1(name) {
  Parent1.call(this, name);
}

var boy1 = new Child('bb');
console.log(boy1.name);


// 组合式继承
function Parent2(name) {
  this.name = name;
}

function Child2(name) {
  Parent2.call(this, name);
}
Child2.prototype = new Parent2();
var boy2 = new Child2('cc');
console.log(boy2.name);

// 原型式继承
function Parent3(name) {
  this.name = name;
}
function content(obj) {
  function F(){};
  F.prototype = obj;
  return new F();
}
var sup = new Parent3('dd');
var boy3 = content(sup);
console.log(boy3.name);


// 寄生式继承
function Parent4 (name){
  this.name = name;
}
function content1(obj) {
  function F() {};
  F.prototype = obj;
  return new F();
}

function subproject(obj) {
  var sub = content(obj);
  sub.age = "12";
  return sub;
}

var parent4 = new Parent4('ff');
var boy4 = subproject(parent4);
console.log(boy4.age);
console.log(boy4.name);

// 寄生组合式继承




// class继承