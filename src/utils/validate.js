/**
 * 过滤特殊字符
 * @param s
 * @returns {string}
 */
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 判断邮箱格式
 * @param value
 * @returns {boolean}
 */
export function validateEmail(value) {
    let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return !reg.test(value);
}

/**
 * 判断密码
 * @param value
 * @returns {boolean}
 */
export function validatePwd(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value);
}

/**
 * 验证验证码
 * @param value
 * @returns {boolean}
 */
export function validateCode(value) {
    let reg=/^\d{6}$/;
    return !reg.test(value);
}
