class Hook {
    constructor(args) {
        this.taps = []
        this.interceptors = []
        this._args = args
    }
    tap(name, fn) {
        this.taps.push({name, fn})
    }
}
class SyncHook extends Hook {
    call(name, fn) {
        try {
            this.taps.forEach(tap => tap.fn(name))
        } catch (err) {
            fn(err)
        }
    }
}

class SyncWaterfallHook extends Hook{
    call(name,fn){
        try {
           let result =  this.taps.reduce((result,tap) => tap.fn(name),null)
            fn(null,result)
        } catch (error) {
            fn(error)
        }

    }
}

class SyncBailHook extends Hook{
    call(name,fn){
        try {
            let result = this.taps.reduce((result,tap) => {
                if(result != undefined){
                    fn(null,result)
                }else{
                    return  tap.fn(name)
                }
            },null)
             fn(null,result)
        } catch (error) {
            fn(error)
        }
    }
}


class SyncLoopHook extends Hook {
    call(name, fn) {
        try {
            this.taps.forEach(tap => {
                let result;
                do {
                    result = tap.fn(name)
                } while (result !== undefined);
            })
            fn(null)
        } catch (error) {
            fn(error)
        }
    }
}