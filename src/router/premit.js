//路由守卫
import router from "./index";
import {getToken, removeToken, removeUsername} from "../utils/app";
import store from "../store/index";

const whiteListRouter =['/login'];


router.beforeEach((to, from, next)=>{
    /*if (getToken()){
        if (to.path==='/login'){
            removeToken();
            removeUsername();
            store.commit("Login/SET_TOKEN","");
            store.commit("Login/SET_USERNAME","");
            next();
        }else {
            next();
        }
    }else {
        if (whiteListRouter.indexOf(to.path)!==-1){
            next();
        }else {
            next('/login')
        }

    }*/
    next();
    // console.log(to);  //进入的页面
    // console.log(from); //上一个页面
    // console.log(next);
    // next()  //参数是路由
});
