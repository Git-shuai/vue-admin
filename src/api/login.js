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
