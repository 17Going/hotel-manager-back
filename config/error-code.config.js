/**
 * 将每种错误都编辑成一种编码
 */

const options = {
    "0":{ // 成功状态码
        code: "0",
        desc: '',
        sug: ''
    },
    "403": {
        code: "403",
        desc: '您无权访问',
        sug: ''
    },
    "1001": {
        code:'1001',
        desc:"用户已存在",
        sug: ''
    },
    "1002": {
        code: '1002', // 错误编码
        desc: '用户名或密码错误',// 描述
        sug: '请重新输入用户名和密码'// 建议
    },
    "1003": {
        code: '1003', // 错误编码
        desc: '验证码错误'// 描述
    }
}

module.exports = function(key){
    return options[key] || {
        code: -1,
        desc: "未知错误"
    }
}