import {getSMS, Register, Login} from "@/api/login";

const login = {
    //单一数据
    state: {},
    //可以改变值computed
    getters: {},
    //改变值
    mutations: {},
    //异步
    actions: {  //可以回调处理事情
        login(content, data) {
            return new Promise((resolve, reject) => {
                //接口
                Login(data).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    },
    modules: {}
};
export default login;
