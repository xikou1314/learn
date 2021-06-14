/*
 * @Description: 
 * @Author: yin.hang
 * @Date: 2019-09-03 10:09:38
 * @LastEditors: yin.hang
 * @LastEditTime: 2019-09-03 14:38:20
 */

function queryOrder(order_sn) {
    return {
        name: '测试商品',
        order_code: order_sn,
        pay_amount: 100
    }
}
// 后端下单方法
function getH5Config(params) {
    return requestParams = {
       appid: 'wx2421b1c4370ec43b', // 公众号id
       mch_id: 'xxx',    // 商户id
       nonce_str: '随机字符串', // 随机字符串  自定义生成
       sign: '签名', // 根据微信签名算法生成 https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_3
       out_trade_no: params['order_code'], // 商户订单号 自己生成 32个字符以内 同一商户下唯一
       body: params.name,   // 商品描述
       total_fee: params['pay_amount'] * 100, // 订单总金额 单位为分
       spbill_create_ip: 'ip地址', // 用户的客户端ip 由后端根据用户请求获取
       notify_url: '你的支付回调地址', // 外网可以直接访问到的 后端地址 接受支付结果的通知
       trade_type: 'MWEB', // 支付类型
       scene_info:  '{"h5_info": {"type":"Wap","wap_url": "https://pay.qq.com","wap_name": "腾讯充值"}}' // 场景信息 常用于线下活动的场景信息上报
    }
 }
 // 请自行实现转换
 function toXml(json) {
    // ...json to xml
    return json;
 }
 
 function h5CreateOrder(url,data) {
    return {
       return_code: 'SUCCESS',
       mweb_url: '/pay.html?payid=xxxxxx'
    }
 }
 
 function getOpenId(url) {
 
    return {
       openid: '微信返回openid'
    }
 }
 
 function getWxConfig(params) {
    return requestParams = {
       appid: 'wx2421b1c4370ec43b', // 公众号id
       mch_id: 'xxx',    // 商户id
       nonce_str: '随机字符串', // 随机字符串  自定义生成
       sign: '签名', // 根据微信签名算法生成 https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_3
       out_trade_no: params['order_code'], // 商户订单号 自己生成 32个字符以内 同一商户下唯一
       body: params.name,   // 商品描述
       total_fee: params['pay_amount'] * 100, // 订单总金额 单位为分
       spbill_create_ip: 'ip地址', // 用户的客户端ip 由后端根据用户请求获取
       notify_url: '你的支付回调地址', // 外网可以直接访问到的 后端地址 接受支付结果的通知
       trade_type: 'JSAPI', // 支付类型
       openid: params.openid
    }
 }
 
 function wxCreateOrder(url, data) {
    return {
       prepay_id: '由微信返回prepay_id'
    }
 }
 
 function createNonceStr() {
    return Math.random().toString(36).substr(2, 15);
 }
 
 function getSign() {
    // ... 签名算法： https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_3
    return '支付需要的签名由后端生成';
 }

module.exports = {
    queryOrder,
    getH5Config,
    toXml,
    h5CreateOrder,
    getOpenId,
    getWxConfig,
    wxCreateOrder,
    createNonceStr,
    getSign
}




