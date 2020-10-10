import service from "@/utils/request";

/**
 * 获取验证码
 * @constructor
 */
export function getSMS(data) {
    return service.request({
        method: "post",
        url: "/getSms/",
        data: data
    });
}

/**
 * 注册
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 * @constructor
 */
export function Register(data) {
    return service.request({
        method: "post",
        url: "/register/",
        data: data
    });
}

/**
 * 登录
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 * @constructor
 */
export function Login(data) {
    return service.request({
        method: "post",
        url: "/login/",
        data: data
    });
}
