// 命令模式
(function () {
  var manage = {
    commond1: function(info) {
      console.log('执行commond1' + info);
    },
    commond2: function(info) {
      console.log('执行commond2' + info);
    },
    excute: function(commond, info) {
      return manage[commond] && manage[commond].apply(manage, [].slice.call(arguments, 1));
    }
  }

})