/**
 * 公共方法类，将所有一些公共方法统一管理起来
 */
const getCode = require('../../config/error-code.config');

/**
 * @description
 * rest接口响应数据组装方法
 * @param {*} data 
 * @param {String} code
 * @return {Object} 
 */
function package(data, code){
    return {
        data,
        error: getCode(code)
    }
}

module.exports = {
    package
}