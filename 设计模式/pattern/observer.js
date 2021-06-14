function ObserverList() {
  this.observerList = [];
}
// 添加
ObserverList.prototype.Add = function (obj) {
  return this.observerList.push(obj);
}
// 清空
ObserverList.prototype.Empty = function () {
  this.observerList = [];
}
// 总数
ObserverList.prototype.Count = function () {
  return this.observerList.length;
}
// 获取
ObserverList.prototype.Get = function (index) {
  if(index > -1 && index < this.observerList.length) {
    return this.observerList[index];
  }
}
// 插入
ObserverList.prototype.Insert = function(obj, index) {
  var pointer = -1;
  if (index === 0) {
    this.observerList.unshift(obj);
    pointer = index;
  } else if (index === this.observerList.length) {
    this.observerList.push(obj);
    pointer = index;
  }
  return pointer;
}
// 查询
ObserverList.prototype.IndexOf = function (obj, startIndex) {
  var i = startIndex, pointer = -1;
  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      pointer = i;
    }
    i++;
  }
  return pointer;
}
// 移除
ObserverList.prototype.RemoveIndexAt = function (index) {
  if (index === 0) {
    this.observerList.shift();
  } else if(index === this.observerList.length - 1) {
    this.observerList.pop();
  }
}
// 使用extension扩展对象
function extend(obj,extension) {
  for (var key in obj) {
    extension[key] = obj[key];
  }
}

function Subject() {
  this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function(observer) {
  thid.observers.Add(observer);
};

Subject.prototype.RemoveObserver = function (observer) {
  this.observers.RemoveIndexAt(this.observers.IndexOf(observer, 0));
}

Subject.prototype.Notify = function (context) {
  var observerCount = this.observers.Count();
  for(var i=0; i < observerCount; i++) {
    this.observers.Get(i).Update(context);
  }
}

