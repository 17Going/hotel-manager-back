const UserModel = require('./model');

function findUserByName(username, cb){
    UserModel.find({
        username
    }).exec(cb);
}

function createUser(user, cb){
    findUserByName(user.username, function(data){
        if(data === null){
            UserModel.create(user, cb)
        } else {
            // 提供已存在用户是错误码
            cd();
        }
    });
    
}

module.exports = {
    findUserByName,
    createUser
};