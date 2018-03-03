const express = require('express');
const router = express.Router();
// 引入userdao
const userDao = require('./user-dao');
const commonUtil = require('../common/common-util');

router.post('/login', (req, res)=>{
    let user = req.body;
    userDao.findUserByName(user.username, function(error, data){
        if(error || data.length === 0){
            res.json(commonUtil.package({}, '1002'));// 用户或密码错误
        } else {
            /**
             * 1、判断密码是否正确
             * 2、密码正确之后，生产token
             */
            // 判断密码是否正确
            if(user.password !== data[0].password){
                res.json(commonUtil.package({}, '1002'));
            } else { 
                // TODO鉴权成功
            }
        }
    });
});

module.exports = router;