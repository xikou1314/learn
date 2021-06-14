// 混合模式
function augment(receivingClass, givingClass) {
  // 只提供特定的方法
  if (arguments[2]) {
    for(var i=2,len = arguments.length; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  } else {
    // 提供所有方法
    for (var methodName in givingClass.prototype) {
      if (!Object.hasOwnProperty(receivingClass.prototype, methodName)) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }
    }
  }
}