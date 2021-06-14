// 模块模式

// 对象字面量

var myModule = {
  myProperty: "someValue",
  // 对象字面量可以包含属性和方法
  // 例如，可以声明模块的配置对象
  myConfig: {
    useCaching: true,
    language: "en"
  },

  // 基本方法
  myMethod: function() {
    console.log("Where in the world is Paul Irish today?");
  },

  // 根据当前配置输出信息
  myMethod2: function() {
    console.log("Caching is:" + (this.myConfig.useCaching) ? "enabled" : "disabled");
  },

  //重写当前的配置
  myMethod3: function(newConfig) {
    if (typeof newConfig === 'object') {
      this.myConfig = newConfig;
      console.log(this.myConfig.language);
    }
  }
};

myModule.myMethod();
myModule.myMethod2();
myModule.myMethod3({
  language: "fr",
  useCaching: false
})

// 自包含模块

var testModule = (function () {
  var counter = 0;
  return {
    incrementCounter: function () {
      return ++counter;
    },
    resetCounter: function () {
      console.log("counter value prior to reset: " + counter);
      counter = 0;
    }
  };
})();

// 用法

// 增加计数器
testModule.incrementCounter();

// 检查计数器并重置
testModule.resetCounter();

var myNamespace = (function () {
  // 私有计数器变量
  var myPrivateVar = 0;

  // 记录所有参数的私有函数
  var myPrivateMethod = function (foo) {
    console.log(foo);
  }

  return {
    // 公有变量
    myPublicVar: "foo",

    // 调用私有变量和方法的公有函数
    myPublicFunction: function (bar) {
      // 增加私有计数器值
      myPrivateVar++;

      // 传入bar调用私有方法
      myPrivateMethod(bar)
    }
  };
})();

// 支持混入
var myNamespace = (function (window) {
  // 私有计数器变量
  var myPrivateVar = 0;

  // 记录所有参数的私有函数
  var myPrivateMethod = function (foo) {
    console.log(foo);
  }

  return {
    // 公有变量
    myPublicVar: "foo",

    // 调用私有变量和方法的公有函数
    myPublicFunction: function (bar) {
      // 增加私有计数器值
      myPrivateVar++;

      // 传入bar调用私有方法
      myPrivateMethod(bar)
    }
  };
})(window);

