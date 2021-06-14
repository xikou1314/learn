const { SyncHook } = require('tapable')


class MyVue {
    constructor() {
        this.hooks = {
            beforeCreate: new SyncHook(['beforeCreateHook']),
            created: new SyncHook(['createdHook']),
            mounted: new SyncHook(),
            destroyed: new SyncHook()
        }
    }
    defaultBeforeCreateHook() {
        this.hooks.beforeCreate.tap('1', (name) => {
            console.log('default', name);
        })
    }
    beforeCreate() {
        console.log('准备初始化MyVue实例了');
        // ....这里框架干了一堆事 ，就通过 hook 把使用者注入代码执行完成了
        this.hooks.beforeCreate.call('MyVue')
    }
    created() {
        console.log('干点其他事，唤起hook created')
        this.hooks.created.call(this)
    }
    init() {
        // ... 干一堆事
        this.beforeCreate()
        // ... 再干一堆事
        this.created()
    }
}

const vueInstance = new MyVue()
vueInstance.hooks.beforeCreate.tap('1', (name) => {
    console.log('hello', name);
})
vueInstance.hooks.beforeCreate.tap('2', (name) => {
    console.log('Wellocome', name);
})

vueInstance.defaultBeforeCreateHook()
vueInstance.init()