// 拷贝对象
function cloneLoop(x) {
  const root = {};
  // 栈
  const loopList = [{
    parent: root,
    key: undefined,
    data: x
  }]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;

    if (typeof key !== 'undefined') {
      res = parent[key] = Array.isArray(data) ? [] : {};
    }

    for (let k in data) {
      // 是自己的属性
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          });
        } else {
          res[k] = data[k];
        }
      }
    }

  }

  return root;
}

var obj = {
  name: '张三',
  gender: '男',
  childs: [
    { name: '张四', gender: '男'},
    { name: '张五', gender: '女'}
  ]
}
var result = cloneLoop(obj);
console.log(JSON.stringify(result));

// 复制对象
function copyObject(orig) {
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}

// 拷贝自身的属性
function copyOwnPropertiesFrom(target, source) {
  Object
  .getOwnPropertyNames(source)
  .forEach(function (propKey) {
    var desc = Object.getOwnPropertyDescriptor(source, propKey);
    Object.defineProperty(target, propKey, desc);
  });
  return target;
}


// 深拷贝

// 循环拷贝 可以深度的拷贝下去

function copyUseLoop(obj) {
  // 类似层序遍历
  let root = {}
  let loopList = [{
    parent: root,
    key: undefined,
    data: obj
  }]

  while(loopList.length > 0) {
    let current = loopList.shift()
    let { parent, key, data} = current

    let res = parent

    if (typeof key !== 'undefined') {
      res = parent[key] = Array.isArray(data) ? [] : {}
    }
    for(k in data) {
      if(data.hasOwnProperty(k)) {
        if(typeof data[k] === 'object') {
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }

  }

  return root
}

function copyUseDeep(obj) {
  // 类似深度遍历
  let res = Array.isArray(obj) ? [] : {}
  for(k in obj) {
    if(obj.hasOwnProperty(k)) {
      if(typeof obj[k] === 'object') {
        res[k] = copyUseDeep(obj[k])
      } else {
        res[k] = obj[k]
      }
    }
  }

  return res
}

//  拷贝最外层

function copyObjectOut(obj) {
  let newObj = Object.create(Object.getPrototypeOf(obj))
  Object.getOwnPropertyNames(obj).forEach(v => {
    Object.defineProperty(newObj, v, Object.getOwnPropertyDescriptor(obj, v))
  })
  return newObj
}