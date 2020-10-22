import { GetCategory} from "./news";
import {reactive} from "@vue/composition-api";
//
export function common() {

    const commonCategory=reactive({
        item: []
    });

    const getInfoCategory=(()=>{
        new GetCategory().then((response)=>{
            commonCategory.item=response.data.data.data;
        }).catch((error)=>{
        });
    });

    return{
        getInfoCategory,
        commonCategory
    }
}
