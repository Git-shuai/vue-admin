//自定义全局组件
import Vue from "vue";

//自定义组件抽取
import SvgIcon from "./svgicon"
Vue.component("svg-icon",SvgIcon);

//解析文件

const req=require.context('./svg',false,/\.svg$/);
const requireAll =requireContext =>{
    return requireContext.keys().map(requireContext);
};
requireAll(req);
