// publish/subscribe模式

var pubsub = {};

(function (q) {
  var topics = {},
    subUid = -1;
  // 发布或广播事件，包含特定的topic名称和参数(比如传递的数据)
  q.publish = function (topic, args) {
    if (!topics[topic]) {
      return false;
    }
    var subscribers = topics[topic];
      len = subscribers ? subscribers.length : 0;
    while (len--) {
      subscribers[len].func(topic, args);
    }
    return this;
  };

  // 通过特定的名称和回调函数订阅事件， topic/event 触发时执行事件
  q.subscribe = function (topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  };

  // 基于订阅上的标记引用，通过特定topic取消订阅
  q.unsubscribe = function (token) {
    for ( var m in topics ) {
      if (topics[m]) {
        for (var i = 0, j = topics[m].length; i<j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i,1);
            return token;
          }
        }
      }
    }
  };
})(pubsub);

// 另一个简单的消息处理程序

// 简单的消息记录器记录所有通过订阅者接收到的主题(topic)和数据

var messageLogger = function (topics, data) {
  console.log("Logging: " + topics + ": " + data);
}

// 订阅者监听订阅的topic, 一旦该topic广播一个通知，订阅者就调用回调函数
var subscription = pubsub.subscribe("inbox/newMessage", messageLogger);

// 发布者负责发布程序感兴趣的topic或通知,例如：
pubsub.publish("inbox/newMessage", "hello world!");

// 或者
pubsub.publish("inbox/newMessage", ["test","a","b","c"]);

// 或者
pubsub.publish("inbox/newMessage", {
  sender: "hello@google.com",
  body: "Hey again!"
});

pubsub.unsubscribe(subscription);
// 如果订阅者不想被通知了，也可以取消订阅
// 一旦取消订阅，下面的代码执行后将不会记录消息，因为订阅者不再进行监听了
pubsub.publish("inbox/newMessage", "Hello! are you still there?");