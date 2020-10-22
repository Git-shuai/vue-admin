import {GetCategory} from "../../api/news";

const actions = {
    getInfoCategory(content,data){
        return new Promise((resolve, reject)=>{
           new GetCategory().then((response)=>{
                resolve(response.data.data.data);
            }).catch((error)=>{
                reject(error)
            });
        })
    }
};

export default {
    namespaced: true,
    actions
};
