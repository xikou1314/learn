html5 离线存储
========

manifest文件结构
---

```
CACHE MANIFEST
# 以上折行必需要写

CACHE:
# 这部分写需要缓存的资源文件列表
# 可以是相对路径也可以是绝对路径
index.html
index.css
images/logo.png
js/main.js
http://img.baidu.com/js/tangram-base-1.5.2.1.js

NETWORK:
# 可选
# 这一部分是要绕过缓存直接读取的文件
login.php


FALLBACK:
# 可选
# 这部分写当访问缓存失败后，备用访问的资源
# 每行两个文件，第一个是访问源，第二个是替换文件*.html /offline.html
```

缓存状态
---

window.applicationCache 对象是对浏览器的应用缓存的编程访问方式。其 status 属性可用于查看缓存的当前状态：

    
``` 
UNCACHED(未缓存)
一个特殊的值，用于表明一个应用缓存对象还没有完全初始化。
    
IDLE(空闲)
应用缓存此时未处于更新过程中。
    
CHECKING(检查)
清单已经获取完毕并检查更新。
    
DOWNLOADING(下载中)
下载资源并准备加入到缓存中，这是由于清单变化引起的。
    
UPDATEREADY(更新就绪)
一个新版本的应用缓存可以使用。有一个对应的事件 updateready，当下载完毕一个更新，并且还未使用 swapCache() 方法激活更新时
，该事件触发，而不会是 cached 事件。

OBSOLETE(废弃)
应用缓存现在被废弃。
```
    
事件
---

正如您所预期的那样，附加事件会用于监听缓存的状态。浏览器会对下载进度、应用缓存更新和错误状态等情况触发相应事件。

```
// 监听是否有cache
appCache.addEventListener('cached', handleCacheEvent, false);

// 监听是否在检测中
appCache.addEventListener('checking', handleCacheEvent, false);

// 监听是否在下载中
appCache.addEventListener('downloading', handleCacheEvent, false);

// 监听是否发生错误
appCache.addEventListener('error', handleCacheError, false);

// 监听是否版本有更新
appCache.addEventListener('noupdate', handleCacheEvent, false);

// 监听是否不存在
appCache.addEventListener('obsolete', handleCacheEvent, false);

// 监听是否在下进程
appCache.addEventListener('progress', handleCacheEvent, false);

// 监听是否更新完毕
appCache.addEventListener('updateready', handleCacheEvent, false);
```

方法
---

update() 	发起应用程序缓存下载进程

abort() 	取消正在进行的缓存下载

swapcache() 	切换成本地最新的缓存环境

实例
---

```
var flag = false;

function cache() {
	var appCache = window.applicationCache;

	//尝试更新缓存
	appCache.update();
	if (flag == false) {
		//检测出manifest文件没有更新
		appCache.addEventListener('noupdate', function() {
			alert('检测出manifest文件没有更新');
			isexit = true;
		}, false);

		//离线文件发送错误
		appCache.addEventListener('error', function() {
			console.log('error');
			return false;
		}, false);

		//manifest缓存状态是已更新
		appCache.addEventListener('updateready', function() {

			//更新成功后，切换到新的缓存
			appCache.swapCache();
			if (confirm('有新版本需要更新么？')) {
				window.location.reload();
			} else {
				alert('重新更新版本号');
				return false;
			};
		}, false);
		
		//离线文件发生错误
		appCache.addEventListener('error',
			function() {
				console.log("存在错误");
			}, false);

		flag = true;
	}
};
$("#check").click(function() {
	cache();
});
```

参考网址：http://www.cnblogs.com/blackbird/archive/2012/06/12/2546751.html
          http://www.html5rocks.com/zh/tutorials/appcache/beginner/#toc-status
          https://developer.mozilla.org/zh-CN/docs/HTML/Using_the_application_cache






