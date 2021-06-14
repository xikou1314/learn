// 装饰者模式
function defaultC(name) {
  // 默认值
  this.name = name;
}
var de = new defaultC('111');

function d1(obj) {
  obj.age = 12;
}
d1(de);
console.log(de);