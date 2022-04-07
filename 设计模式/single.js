// 单例模式
var single = ( function() {
  var instance;
  function init() {
    var name = '张三';
    return {
      getName: name
    }
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();;;
      }
      return instance;
    }
  }

})();
