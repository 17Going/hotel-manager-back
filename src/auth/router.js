const express = require('express');
const router = express.Router();
// 引入dao
const authDao = require('./dao');
const commonUtil = require('../../common/common-util');
const jwt = require('jsonwebtoken');
const vertifyCfg = require('../../config/vertify.config');

router.post('/login', (req, res)=>{
    let user = req.body;
    
    authDao.vertify(user, function(result){
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

module.exports = router;