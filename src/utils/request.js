import axios from "axios";
import {Message} from 'element-ui';
import {getToken, getUsername} from "./app";


//创建axios 赋给变量service
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";

const service = axios.create({
    baseURL: BASEURL,
    timeout: 3000,
});

// console.log(process.env.VUE_APP_ABC);

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    //tokey ,userid
    config.headers['Tokey']=getToken();
    config.headers['UserName']=getUsername();
    // console.log(config.headers);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.resCode !== 0) {
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        return response;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default service
