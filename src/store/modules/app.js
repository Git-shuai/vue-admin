import Cookie from "cookie_js";

const state = {
    isCollapse: JSON.parse(Cookie.get('isCollapse'))|| false
};

const getters = {
};

const mutations = {
    SET_isCollapse(state) {
        state.isCollapse = !state.isCollapse;
        // sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
        Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
};
