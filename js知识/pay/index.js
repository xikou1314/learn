/*
 * @Description: 
 * @Author: yin.hang
 * @Date: 2019-09-02 20:15:00
 * @LastEditors: yin.hang
 * @LastEditTime: 2019-09-03 10:58:06
 */
const express = require('express');
const open = require('open');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');

// 允许所有的请求形式 
app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', router);





app.use(express.static('./page'));

app.listen(3000, () => console.log('Example app listen on port 3000!'));

open('http:127.0.0.1:3000/index.html');