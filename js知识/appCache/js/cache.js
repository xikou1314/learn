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