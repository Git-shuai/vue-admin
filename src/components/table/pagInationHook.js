import {reactive} from "@vue/composition-api";

export function paginationHook() {

    const pageData=reactive({
        currentPage: 1,
        pageSize: 1,
        pageSizeS: [10, 20, 30, 100],
        total: 100
    });

    const totalCount=((val)=>{pageData.total=val;});

    const handleSizeChange=((val)=>{pageData.pageSize=val;});

    const handleCurrentChange=((val)=>{pageData.currentPage=val;});

    return {
        //对象
        pageData,
        //函数
        handleSizeChange,
        handleCurrentChange,
        totalCount
    }
}