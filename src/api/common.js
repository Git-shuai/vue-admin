import {GetCategory, GetAllCategory} from "./news";
import {reactive} from "@vue/composition-api";
import service from "@/utils/request";

//
export function common() {

    const commonCategory = reactive({
        item: []
    });
    //获取全部分类
    const getInfoCategory = (() => {
        new GetCategory().then((response) => {
            commonCategory.item = response.data.data.data;
        }).catch((error) => {
        });
    });

    //获取全部分类
    const getInfoCategoryAll = (() => {
        new GetAllCategory().then((response) => {
            commonCategory.item = response.data.data;
        }).catch((error) => {
        });
    });

    return {
        getInfoCategory,
        commonCategory,
        getInfoCategoryAll
    }
}

/**
 * 获取七牛云
 * @returns {*|http.ClientRequest|ClientHttp2Stream|Promise<AxiosResponse<T>>}
 * @constructor
 */
export function QiniuToken() {

    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data: data
    });
}

/**
 * 获取requestURL
 * @param {} data
 * @returns {*|http.ClientRequest|ClientHttp2Stream|Promise<AxiosResponse<T>>}
 * @constructor
 */
export function LoadTableData(data) {
    return service.request({
        method: data.method || "post",
        url: data.url,
        data: data.data || {}
    });
}
