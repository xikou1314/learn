// 发布订阅模式
function message() {
  var topic = {};
  this.listen = function(key,fn) {
    if(!topic[key]) {
      topic[key] = [fn];
    } else {
      topic[key].push(fn);
    }
  }
  this.trigger = function() {
    var key = Array.prototype.shift.call(arguments);
    var fnList = topic[key];
    if (!fnList || fnList.length === 0) {
        return false;
    }
    for (var i = 0, fn; fn = fnList[i++];) {
        fn.apply(this, arguments);
    }
  }
  this.remove = function(key, fn) {
    if(!topic[key]) return;
    var fnList = topic[key];
    fnList.splice(fnList.indexOf(fn), 1);
  }
  this.clear = function() {
    topic = {};
  }
}
var BaseMessager = new message();
