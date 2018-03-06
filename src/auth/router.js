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
    console.log(user.vertifycode, req.session.vertifycode)
    if(req.session.errorNum >= vertifyCfg.maxErrorNum){
        if(!user.vertifycode || user.vertifycode.toLowerCase() !== req.session.vertifycode.toLowerCase()) {
            res.json(commonUtil.package({
                needVertifycode: true
            }, '1003'));// 用户或密码错误
            return ;
        }
    }
            
    authDao.vertify({
        username: user.username,
        password: user.password
    }, function(result){
        if(result){ // 鉴权成功
            req.session.errorNum = 0;
            jwt.sign(user, vertifyCfg.cert, {
                expiresIn: vertifyCfg.expiresIn
            }, function(err, token){
                res.json(commonUtil.package({
                    username: user.username,
                    token: token
                }, '0'));
            });
        } else {// 鉴权失败
            let data = {};
            // 进行密码错误输入3次，显示验证码操作
            if(!req.session.errorNum){
                req.session.errorNum = 1;
            } else {
                req.session.errorNum++;
            }
            
            if(req.session.errorNum >= vertifyCfg.maxErrorNum){
                data.needVertifycode = true;
            }
            
            res.json(commonUtil.package(data, '1002'));// 用户或密码错误
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