const express = require('express');
const router = express.Router();
// 引入dao
const authDao = require('./dao');
const commonUtil = require('../../common/common-util');
const jwt = require('jsonwebtoken');
const vertifyCfg = require('../../config/vertify.config');

/**
 * 登录
 */
router.post('/login', (req, res)=>{
    let user = req.body;

    // 进行验证码校验
    if(!user.vertifycode || user.vertifycode.toLowerCase() !== req.session.vertifycode.toLowerCase()) {
        res.json(commonUtil.package({
            needVertifycode: true
        }, '1003'));// 用户或密码错误
        return ;
    }

    // 进行用户名和密码校验
    authDao.vertify({
        username: user.username,
        password: user.password
    }, function(result){
        if(result){ // 鉴权成功
            jwt.sign(user, vertifyCfg.cert, {
                expiresIn: vertifyCfg.expiresIn
            }, function(err, token){
                res.json(commonUtil.package({
                    username: user.username,
                    token: token
                }, '0'));
            });
        } else {// 鉴权失败
            res.json(commonUtil.package({}, '1002'));// 用户或密码错误
        }
    });
});

/**
 * 获取验证码
 */
router.get('/vertifycode', (req, res)=>{
    const code = commonUtil.getVertifyCode();
    // 保存文字进行session校验
    req.session.vertifycode = code.text;
    res.type('svg');
    res.send(code.data);
});

module.exports = router;