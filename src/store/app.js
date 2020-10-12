import Cookie from "cookie_js";

const app ={
    //单一数据
    state: {
        isCollapse: JSON.parse(Cookie.get('isCollapse')) || false
    },
    //可以改变值computed
    getters: {},
    //改变值
    mutations: {
        SET_isCollapse(state) {
            state.isCollapse = !state.isCollapse;
            // sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
            Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
        }
    }
};
export default app;
