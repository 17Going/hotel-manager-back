/**
 * 后端服务器模块：使用node-dev（npm install -g node-dev）启动，修改代码，自动重启
 */

const express = require('express');
const app = express();
const commonUtil = require('./common/common-util');
const jwt = require('jsonwebtoken');
const verifyCfg = require('./config/vertify.config');

// 启动数据库
require('./config/db.config');

// 引用解析body中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 添加cookie解析中间件
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// 使用session
const session = require('express-session');
app.use(session({ secret: 'hotel'}));

// 中间件，标记所有请求时间
app.use((req, res, next)=>{
    // 跳过登录，不进行token验证
    if(req.path === '/login' || req.path === '/vertifycode'){
        next();
    } else {
        // 进行token验证
        jwt.verify(req.cookies['HOTEL_TOKEN'], verifyCfg.cert, function(err){
            if(err){
                // token认证失败，无权限访问
                res.json(commonUtil.package({}, '403'));
            } else {
                next();
            }
        });
    }
});

// 注册登录路由
const loginRouter = require('./src/auth/router');
app.use(loginRouter);

app.listen(3001, ()=>{
    console.log("后端node监听3001端口");
});