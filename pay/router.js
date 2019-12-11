/*
 * @Description: 
 * @Author: yin.hang
 * @Date: 2019-09-02 20:38:00
 * @LastEditors: yin.hang
 * @LastEditTime: 2019-09-12 17:01:29
 */
const express = require('express')
const router = express.Router()
const mock = require('./mock');



router.post('/order/h5/create', function (req, res) {
   console.log(req.body);

   var order_sn = req.body.order_sn;

   // 根据order_sn 查询自己数据库中保存的订单信息 
   var orderData = mock.queryOrder(order_sn);
  
   // 生成调用微信创建订单的参数

   var unifiedOrderParams = mock.getH5Config(orderData);

   // 将参数转换为xml格式 !!! 由后端自己转换
   unifiedOrderParams = mock.toXml(unifiedOrderParams);
   // 调用微信支付接口下单
   var result = mock.h5CreateOrder('https://api.mch.weixin.qq.com/pay/unifiedorder', unifiedOrderParams);

   if(result['return_code'] != 'SUCCESS')
   {
      
      return res.send({
         status: -1,
         msg: 'failed'
      });
   }

   // 成功 返回支付链接
   res.send({
      status: 0,
      msg: 'ok',
      mweb_url: result['mweb_url'] 
   });

})

router.post('/order/wx/create', function (req, res) {
   console.log(req.body);

   // 前端传入code 和 state state等价于order_sn
   var code = req.body.code;

   var state = req.body.state;

   // 根据order_sn 查询自己数据库中保存的订单信息 
   var orderData = mock.queryOrder(state);

   // 根据code 获取 openid
   var openid = mock.getOpenId('https://api.weixin.qq.com/sns/oauth2/access_token?appid=你的appid&secret=你的秘钥&code=' + code + '&grant_type=authorization_code')
  
   // 生成下单的参数
   orderData.openid = openid.openid;
   var unifiedOrderParams = mock.getWxConfig(orderData);

   // 将参数转换为xml格式 !!! 由后端自己转换
   unifiedOrderParams = mock.toXml(unifiedOrderParams);

   // 调用微信支付接口下单 获得prepay_id
   var result = mock.wxCreateOrder('https://api.mch.weixin.qq.com/pay/unifiedorder', unifiedOrderParams);

   // 生成timeStamp
   var timeStamp = parseInt(new Date().getTime() / 1000).toString();
   // 生成随机字符串
   var nonce_str = mock.createNonceStr();
   // 生成微信签名
   var paySign = mock.getSign();


   return res.send({
      appId: '你的appId',
      timeStamp: timeStamp,
      nonceStr: nonce_str,
      signType: 'MD5',
      package: "prepay_id=" + result.prepay_id,
      paySign: paySign
   });
 })
module.exports = router