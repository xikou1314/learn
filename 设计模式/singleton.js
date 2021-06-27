var mySingleton = (function () {
  // 实例保持了 Singleton的一个引用
  var instance;
  function init() {
    // Singleton
    // 私有方法和变量
    function privateMethod() {
      console.log("I am private");
    }
    var privateVariable = "Im also private";
    var privateRandomNumber = Math.random();

    return {
      // 公有方法和变量
      publicMethod: function() {
        console.log("The public can see me!")
      },
      publicProperty: "I am also public",
      getRandomNumber: function () {
        return privateRandomNumber;
      }
    }
  };
  return {
    // 获取Singleton的实例，如果存在就返回，不存在就创建新实例
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  }
})();

var myBadSingleton = (function () {
  // 实例保持了Singleton的一个引用
  var instance;
  function init() {
    //Singleton
    var privateRandomNumber = Math.random();
    return {
      getRandomNumber: function() {
        return privateRandomNumber;
      }
    }
  };
  return {
    // 每次都创建新的实例
    getInstance: function () {
      instance = init();
      return instance;
    }
  }
})();


var SingletonTester = (function () {
  // options: 包含singleton所需配置的对象
  // e.g var options = {name: "test", pointX:5};
  function Singleton ( options ) {
    // 如果未提供 options，则设置为空对象
      options = options || {};

    // 为singleton设置一些属性
    this.name = "SingletonTester";

    this.pointX = options.pointX || 6;
    this.pointY = options.pointY || 10;

  } 

  // 实例持有者
  var instance;

  // 静态变量和方法的模拟
  var _static = {
    name: "SingletonTester",
    // 获取实例的方法，返回singleton对象的singleton实例
    getInstance: function (options) {
      if(instance === undefined) {
        instance = new Singleton( options );
      }
      return instance;
    }
  }
  return _static;
})();

var singletonTest = SingletonTester.getInstance({
  pointX: 5
});

// 记录pointX的输出以便验证
// 输出5
console.log(singletonTest.pointX);


