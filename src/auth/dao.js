const Model = require('./model');

function findUserByName(username, cb){
    Model.find({
        username
    }).exec(cb);
}

function createUser(user, cb){
    findUserByName(user.username, function(data){
        if(data === null){
            Model.create(user, cb)
        } else {
            // 提供已存在用户是错误码
            cd();
        }
    });
}

/**
 * @description
 * 鉴权
 * @param {Object} user 用户信息
 * @param {Function} cb 回调方法
 */
function vertify(user, cb){
    Model.findOne(user).exec(function(err, data){
        if(err || !data){
            cb(false);
        } else {
            cb(true);
        }
    });
}

module.exports = {
    findUserByName,
    createUser,
    vertify
};