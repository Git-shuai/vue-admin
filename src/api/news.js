import service from "@/utils/request";

/**
 * 添加一级分类
 * @param data
 * @returns {*}
 * @constructor
 */
export function AddFirstCategory(data) {
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data: data
    });
}
