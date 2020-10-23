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

/**
 * 修改一级分类
 * @param data
 * @returns {*}
 * @constructor
 */
export function EditFirstCategory(data) {
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data: data
    });
}

/**
 * 获取分类
 * @param data
 * @returns {*}
 * @constructor
 */
export function GetCategory(data) {
    return service.request({
        method: "post",
        url: "/news/getCategory/",
        data: data
    });
}

/**
 * 获取所有分类（包含子级）
 * @param data
 * @returns {*}
 * @constructor
 */
export function GetAllCategory(data) {
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/ ",
        data: data
    });
}

/**
 * 删除一级分类
 * @param data
 * @returns {*}
 * @constructor
 */
export function DelCategory(data) {
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data: data
    });
}

/**
 * 新增接口
 * @param data
 * @returns {*|http.ClientRequest|ClientHttp2Stream|Promise<AxiosResponse<T>>}
 * @constructor
 */
export function AddNews(data) {
    return service.request({
        method: "post",
        url: "/news/add/",
        data: data
    });
}

/**
 * 获取信息列表
 * @param data
 * @returns {*|http.ClientRequest|ClientHttp2Stream|Promise<AxiosResponse<T>>}
 * @constructor
 */
export function GetInfoList(data) {
    return service.request({
        method: "post",
        url: "/news/getList/",
        data: data
    });
}

/**
 * 删除信息
 * @param data
 * @returns {*|http.ClientRequest|ClientHttp2Stream|Promise<AxiosResponse<T>>}
 * @constructor
 */
export function DeleteInfo(data) {
    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data: data
    });
}

/**
 * 修改信息
 * @param data
 * @returns {*|http.ClientRequest|ClientHttp2Stream|Promise<AxiosResponse<T>>}
 * @constructor
 */
export function EditInfo(data) {
    return service.request({
        method: "post",
        url: "/news/editInfo/",
        data: data
    });
}

/**
 * 添加子级分类
 * @param data
 * @returns {*|http.ClientRequest|ClientHttp2Stream|Promise<AxiosResponse<T>>}
 * @constructor
 */
export function AddChildrenCategory(data) {
    return service.request({
        method: "post",
        url: "/news/addChildrenCategory/",
        data: data
    });
}
