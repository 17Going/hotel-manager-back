const mongoose = require('mongoose');

// 数据访问路径
const url = 'mongodb://root:root@127.0.0.1:27017/hotel';

// 数据库相关配置
const options = {
    autoIndex: false,// 建议：禁止自动创建索引行为，会导致性能问题
    bufferCommands: true,
    keepAlive: 120// 存活时间（单位：毫秒）
};


module.exports = mongoose.connect(url, options).then(()=>{
    console.log("mongoDB数据库已经正确连接了");
},(err)=>{
    console.log("mongoDB数据库连接失败！");
    console.log(err);
});