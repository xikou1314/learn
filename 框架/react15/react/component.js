import { isFunction } from "./utils";
import { compareTwoElement } from "./vdom";

// 更新队列
export const updateQueue = {
    updaters: [],
    isPending: false, // 是否批量更新模式，如果 isPending = true，则处于批量更新模式
    add(updater){   // 把要更新的 更新器 放入队列中，等待下一步去更新
        this.updaters.push(updater);
    },
    batchUpdate(){ // 真正的去更新
        let { updaters } = this;
        this.isPending = true;
        let updater;
        // 使用批量更新
        while(updater = updaters.pop()){
            updater.updateComponent(); // 更新所有的需要更新的组件
        }

        this.isPending = false;
    }
}

// 更新器
class Updater {
    constructor(componentInstace){
        // 一个 Updater 对应一个类的实例
        this.componentInstace = componentInstace;

        // 更新如果是批量的，把更新的数据统一放到数组里面，统一合并之后再更新
        this.pendingStates = [];

        this.nextProps = null;
    }

    addState(partialState) {
        this.pendingStates.push(partialState);

        // 开始试图更新
        this.emitUpdate();
    }

    emitUpdate(nextProps) {
        //  触发更新
        this.nextProps = nextProps;
        // 触发的时候 nextProps有值 或者更新队列不是正在pending状态 则使用非批量更新
        // 处于非批量更新模式
        if(this.nextProps || !updateQueue.isPending){
            this.updateComponent();
        } else {
            // 批量更新模式
            updateQueue.add(this);
        }

    }

    // 组件新，老状态合并
    getState() {
        let { componentInstace, pendingStates } = this;

        // 组件的老状态
        let { state } = componentInstace;
        
        if(pendingStates.length > 0){
            pendingStates.forEach(nextState => {
                // 如果state是一个function
                if(isFunction(nextState)){
                    state = {...state, ...nextState.call(componentInstace, state)};
                } else {
                    state = {...state, ...nextState};
                }
            })
        }
        // 用完之后清除pendingStates
        pendingStates.length = 0;
        return state;
    }

    updateComponent() {
        let { componentInstace, pendingStates, nextProps } = this;
        if(nextProps || pendingStates.length > 0){
            // nextProps存在 或者 pendingStates的长度大于0
            // 则判断是否应该更新
            shouldUpdate(componentInstace, nextProps, this.getState());
        }
    }
}

function shouldUpdate(componentInstace, nextProps, nextState){
    // 将props和state赋值给当前的实例
    componentInstace.props = nextProps;
    componentInstace.state = nextState;
    // 执行shouldComponentUpdate方法 合并了但是不更新 就是不会显示在页面上
    if(componentInstace.shouldComponentUpdate && !componentInstace.shouldComponentUpdate(nextProps, nextState)){
        return false
    }
    // 构造了新的state并强制更新
    // 组件进入强制更新状态，实际更新
    componentInstace.forceUpdate();
}
// class组件 会继承这个类
class Component {
    constructor(props){
        this.props = props;
        // 创建一个新的updater实例
        this.$updater = new Updater(this);
        this.state = {};
        this.nextProps = null; // 下一个props
    }

    /**
     * 在 React 中进行事件处理函数执行的时候，会进入批量更新模式
     * 处于批量更新模式前提下，是不更新数据的，而是把数据缓存起来，
     * 在事件函数执行完成之后再全部更新数据
     * @param {*} partialState 待更新的数据
     */
    setState(partialState){
        // 通过触发updater完成更新
        this.$updater.addState(partialState);
    }

    forceUpdate(){
        let { props, state, renderElement: oldRenderElement } = this;

        if(this.componentWillUpdate){
            this.componentWillUpdate()
        }

        let newRenderElement = this.render();

        let { getSnapshotBeforeUpdate } = this;
        let extraArgs = getSnapshotBeforeUpdate && getSnapshotBeforeUpdate(); 

        let currentElement = compareTwoElement(oldRenderElement, newRenderElement);
        this.renderElement = currentElement;

        if(this.componentWillMount){
            this.componentWillMount(props, state, extraArgs);
        }
    }
}

// 区分类组件和函数组件
Component.prototype.isReactComponent = true;

export default Component;