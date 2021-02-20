function Tapable() {
    this._plugins = {};
}

Tapable.prototype.plugin = function plugin(name, fn) {
    if (Array.isArray(name)) {
        name.forEach(function(name) {
            this.plugin(name, fn);
        }, this);
        return;
    }
    if (!this._plugins[name]) this._plugins[name] = [fn]
    else this._plugins[name].push(fn)
}

Tapable.prototype.applyPlugins = function applyPlugins(name) {
    if (!this._plugins[name]) return;
    var args = Array.prototype.slice.call(arguments, 1);
    var plugins = this._plugins[name];
    for( var i = 0; i < plugins.length; i++ ) {
        plugins[i].apply(this, args)
    }
}

Tapable.prototype.applyPluginsWaterfall = function applyPluginsWaterfall(name, init) {
    if(!this._plugins[name]) return init;
    var args = Array.prototype.slice.call(arguments, 1);
    var plugins = this._plugins[name];
    var current = init;
    for (var i = 0; i < plugins.length; i++) {
        args[0] = current;
        current = plugins[i].apply(this, args);
    }
    return current;
}


Tapable.prototype.applyPluginsBailResult = function applyPluginsBailResult(name) {
    if (!this._plugins[name]) return;
    var args = Array.prototype.slice.call(arguments, 1);
    var plugins = this._plugins[name];

    for (var i=0; i<plugins.length; i++) {
        var result = plugins[i].apply(this, args);
        if (typeof result !== "undefined") {
            return result;
        }
    }
}

Tapable.prototype.applyPluginsAsyncSeries = Tapable.prototype.applyPluginsAsync = function applyPluginsAsyncSeries(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    var callback = args.pop();
    var plugins = this._plugins[name];
    if (!plugins || plugins.length === 0) return callback()
    var i = 0;
    var _this = this;
    args.push(copyProperties(callback, function next(err) {
        if (err) return callback(err);
        i++;
        if (i >= plugins.length) {
            return callback();
        }
        plugins[i].apply(_this, args);
    }))
    plugins[0].apply(this, args)
}


module.exports = Tapable