// 构造器模式
function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
  this.toString = function() {
    return this.model + "has done " + this.miles  + " miles";
  };
}

// 用法 

// 可以创建car的新实例
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

// 打开浏览器控制台，查看这些对象上调用的toString()方法的输出
console.log(civic.toString());
console.log(mondeo.toString());


// 带原型的构造器
function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}
// 注意这里我们使用Object.prototype.newMethod而不是Object.prototype是为了避免重新定义prototype对象
Car.prototype.toString = function() {
  return this.model + " has done " + this.miles + " miles";
}

// 用法 

var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());


