// 中介者模式
var mediator = (function () {
  var topics = {};
  var subscribe = function(topic, fn) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push({content: this, callback: fn});
    return this;
  } 

  var publish = function(topic) {
    var args;
    if (!topics[topic]) {
      return false;
    }
    args = Array.prototype.slice.call(arguments, 1);
    topics[topic].forEach(v => {
      v.callback.apply(v.content, args);
    });
    return this;
  }

  return {
    Publish: publish,
    Subscribe: subscribe,
    installTo: function(obj) {
      obj.subscribe = subscribe;
      obj.publish = publish;
    }
  }
})();

