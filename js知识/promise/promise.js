class Promise {
  constructor(executor) {
    // 不能相信用户的输入，所以这里要做参数校验
    if (typeof executor !== "function") {
      throw new TypeError(`Promise resolver ${executor} is not a function`);
    }

    this.initValue();
    this.initBind();

    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  // 绑定this
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  // 进行代码优化
  initValue() {
    // 记录状态和值的改变
    // 初始化值
    this.value = null; // 终值
    this.reason = null; // 拒因
    this.state = Promise.PENDING; // 状态
    this.onFulfilledCallbacks = []; //成功回调
    this.onRejectedCallbacks = []; // 失败回调
  }
  resolve(value) {
    // 成功后的一系列操作 （状态的改变，成功回调的执行）
    if (this.state === Promise.PENDING) {
      // 状态进行改变
      this.state = Promise.FULFILLED;
      // 执行成功的回调，把终值进行赋值
      this.value = value;
      // 成功或者失败以后进行这两个数组的执行
      this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
    }
  }
  reject(reason) {
    // 失败后的一系列操作（状态的改变，失败回调的执行）
    if (this.state === Promise.PENDING) {
      // 状态进行改变
      this.state = Promise.REJECTED;
      // 执行成功的回调，把拒因进行赋值
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
    }
  }
  then(onFulfilled, onRejected) {
    // 参数校验
    if (typeof onFulfilled !== "function") {
      onFulfilled = function (value) {
        return value;
      };
    }
    if (typeof onRejected !== "function") {
      onRejected = function (reason) {
        throw reason;
      };
    }

    // 实现链式调用，且改变了后面的then的值，必须通过新的实例

    let promise2 = new Promise((resolve, reject) => {
      if (this.state === Promise.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            Promise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.state === Promise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            Promise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      // 追加一个状态的判断
      if (this.state === Promise.PENDING) {
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value);
              Promise.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(reason);
              Promise.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }
}

Promise.PENDING = "pending";
Promise.FULFILLED = "fulfilled";
Promise.REJECTED = "reject";
Promise.resolvePromise = function (promise2, x, resolve, reject) {
  // x 与 promise 相等
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle detected for promise"));
  }

  let called = false;
  if (x instanceof Promise) {
    // 判断 x 为 Promise
    x.then(
      (value) => {
        Promise.resolvePromise(promise2, value, resolve, reject);
      },
      (reason) => {
        reject(reason);
      }
    );
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // x 为对象或函数
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (value) => {
            if (called) return;
            called = true;
            Promise.resolvePromise(promise2, value, resolve, reject);
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};
module.exports = Promise;
