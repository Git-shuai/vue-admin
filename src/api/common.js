import { GetCategory,GetAllCategory} from "./news";
import {reactive} from "@vue/composition-api";
//
export function common() {

    const commonCategory=reactive({
        item: []
    });
    //获取全部分类
    const getInfoCategory=(()=>{
        new GetCategory().then((response)=>{
            commonCategory.item=response.data.data.data;
        }).catch((error)=>{
        });
    });

    //获取全部分类
    const getInfoCategoryAll=(()=>{
        new GetAllCategory().then((response)=>{
            commonCategory.item=response.data.data;
        }).catch((error)=>{
        });
    });

    return{
        getInfoCategory,
        commonCategory,
        getInfoCategoryAll
    }
}
