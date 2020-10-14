import {MessageBox} from "element-ui";

import {ref, reactive} from "@vue/composition-api";
export function global() {

    const confirm=(()=>{
        console.log(1234)
    });

    return{
        confirm
    }
}
