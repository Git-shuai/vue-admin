import {Login} from "@/api/login";
import {getUsername, removeToken, removeUsername, setToken, setUsername} from "../../utils/app";

const state = {
    token: '',
    username: getUsername() || ''
};
const getters = {
    username: state=> state.username
};
const mutations = {
    SET_TOKEN(state,value){
        state.token=value;
    },
    SET_USERNAME(state,value){
        state.username=value;
    }
};
const actions = {
    login(content, data) {
        return new Promise((resolve, reject) => {
            //接口
            Login(data).then((response) => {
                let resdata = response.data.data;
                content.commit('SET_TOKEN',resdata.token);
                content.commit('SET_USERNAME',resdata.username);
                setToken(resdata.token);
                setUsername(resdata.username);
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    exit(content,data){
        return new Promise((resolve, reject)=>{
            // 退出
            // content.commit('SET_TOKEN','');
            // content.commit('SET_USERNAME','');
            // removeToken();
            // removeUsername();
            resolve();
        })

    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions

};
