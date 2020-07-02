// 观察者模式

// 目标
// add remove notify方法
// 观察者
// update方法

function Subject() {
  var observerList = [];
  this.add = function(observer) {
    observerList.push(observer);
  }
  this.remove = function(observer) {
    var index = observerList.indexOf(observer);
    if (index > -1) {
      observerList.splice(index,1);
      return true;
    }
    return false;
  }
  this.notify = function(context) {
    // 调用list里面所有观察者的update方法
    observerList.forEach(v => {
      v.update(context);
    })
  }
}

function Observer() {
  this.update = function() {
    // 更新的具体方法
    console.log('更新');
  }
}

function extend(obj,extension) {
  for (var key in obj) {
    extension[key] = obj[key];
  }
}

// var concretSubject = new Subject();

// var observer1 = new Observer();
// var observer2 = new Observer();

// concretSubject.add(observer1);
// concretSubject.add(observer2);
// concretSubject.remove(observer2);

function sub(name) {
  this.name = name;
  this.checked = false
}
var mySub = new sub('张三');
extend(new Subject(), mySub);

function ob(name) {
  this.name = name;
  this.updatedStatus = false;
  this.update = function (value) {
    
    this.updatedStatus = value;
    console.log(this.name + '更新后的数值为' + value);
  }
}

var myob1 = new ob('观察者1');
var myob2 = new ob('观察者2');

// extend(new Observer(),myob1);
// extend(new Observer(),myob2);

mySub.add(myob1);
mySub.add(myob2);

mySub.checked = true;
// console.log(JSON.stringify(mySub));
mySub.notify(mySub.checked);