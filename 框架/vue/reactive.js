    // 以vue3 ref为例
    // 定义响应式对象， 对外接口 ref
    function ref(value) {
      return createRef(value)
  }


  function createRef(value) {
      return new RefImpl(value)
  }

  class RefImpl {
      constructor(value) {
          this._value = value
      }
      get value() {
          track(this, 'value')
          return this._value
      }
      set value(newVal) {
          this._value = newVal
          trigger(this, 'value')
      }
  }


  // 依赖收集部分
  const targetMap = new WeakMap()
  let activeEffect
  function track(target, key) {
      let depMap = targetMap.get(target)
      if (!depMap) {
      targetMap.set(target, (depMap = new Map())) 
      }
      let deps = depMap.get(key)
      if (!deps) {
          depMap.set(key, deps = new Set())
      }
      if(activeEffect) {
          deps.add(activeEffect)
          activeEffect.deps.push(deps)
      }
  }


  // 副作用部分
  function effect(fn) {
      const effect1 = createReactiveEffect(fn)
      effect1()
  }

  function createReactiveEffect(fn) {
      const effect =  function reactiveEffect() {
          activeEffect = effect
          return fn()
      }
      effect.deps = []
      return effect
  }
  // trigger
  function trigger(target, key) {
      const depMap = targetMap.get(target)
      if (!depMap) return
      const deps = depMap.get(key)
      deps.forEach(dep => {
          dep()
      })
  }