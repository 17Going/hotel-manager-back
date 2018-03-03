const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 第一步：定义用户 Schema
/* 
    类型包含以下几类：
        String
        Number
        Date
        Buffer
        Boolean
        Mixed
        ObjectId
        Array
*/
var userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

// 第二步：创建一个模型
var User = mongoose.model('User', userSchema);

// 第三步为Schema，添加实列方法

/**
 * @description
 * 根据实例的参数查询用户 注：此方法通过实例调用
 * @param Function cb回调方法
 * 
 */
userSchema.methods.findUser = function(cb){
    return this.model('User').find({
        username: this.username
    }, cb);
};

// 第四步添加静态方法

/**
 * @description
 * @static
 * 根据实例的参数查询用户名 注：此方法为静态
 * @param String username 用户名
 * @param Function cb回调方法
 * 
 */
userSchema.statics.findByName = function (name, cb) {// 注：静态方法，不能使用箭头函数
    return this.find({
        name: newRegExp(name, 'i')
    }, cb);
};

// 第5步 添加查询辅助方法（与静态方法一样调用，回调函数调用方式不同）
userSchema.query.byName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
};

// 定义虚拟的属性（不会被数据库永久化，类似get方法）

userSchema.virtual('name').get(function () {
    return this.username + '管理员'; // TODO可以对永久化属性进行计算处理
});

userSchema.virtual('name').set(function (name) {
    this.username = name; // TODO可以对永久化属性进行计算处理
});

module.exports = User;