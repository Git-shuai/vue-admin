import {MessageBox} from "element-ui";
import { Message } from 'element-ui';

import {ref, reactive} from "@vue/composition-api";
export function global() {

    const confirm=((param)=>{
        console.log(param.content)
        MessageBox.confirm(param.content,"提示",{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(() => {
           Message({
               type: 'success',
               message: '已删除'
           })
        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消删除'
            });
        });


    });

    return{
        confirm
    }
}
