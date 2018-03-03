/**
 * 后端服务器模块：使用node-dev（npm install -g node-dev）启动，修改代码，自动重启
 */

const express = require('express');
const app = express();

// 启动数据库
require('./config/db.config');

// 引用解析body中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 添加cookie解析中间件
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// 中间件，标记所有请求时间
app.use((req, res, next)=>{
    console.log(new Date().toLocaleString());
    next();
})

// 注册登录路由
const loginRouter = require('./src/login/router');
app.use(loginRouter);

app.listen(3001, ()=>{
    console.log("后端node监听3001端口");
});