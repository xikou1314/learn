const createStore = (reducer) => {
  let state;
  // listener 用来存储所有的监听函数
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    // 每一次状态更新后，都需要调用listeners数组中的每一个监听函数
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    // subscribe可能会被调用多次，每一次调用时，都将相关的监听函数存入listeners数组中
    listeners.push(listener); 
    // 返回一个函数，进行取消订阅
    return () => {
      listeners = listeners.filter(item => item !== listener);
    }
  }

  dispatch({});

  return { getState, dispatch, subscribe };

}

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    );
  }
}

const logger = (store) => (next) => {

  if(!console.group) {
    return next;
  }

  return (action) => {
    // 按照action类型进行输出分组，保证在同一个action下拥有相同的日志title
    console.group(action.type);
    // 打印更新前的state
    console.log('%c previous state', 'color: gray' ,store.getState());
    // 打印当前action
    console.log('%c action', 'color: blue' , action);

    // 调用原始的dispatch并记录返回值
    const returnValue = next(action);

    // 打印更新后的state
    console.log('%c next state', 'color: green' , store.getState());

    console.group(action.type);

    return returnValue;
  }
}


const promise = (store) => (next) => (action) => {

  // 对action进行判断,当是一个Promise对象时
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
}

const configureStore = () => {
  const store = createStore(App);

  const middlewares = [];

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  middlewares.push(promise);

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  })
}

