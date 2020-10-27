<template>
    <el-table :data="data.tableData" border style="width: 100%">
        <!--多选择-->
        <el-table-column v-if="data.tableConfig.selections" type="selection" width="45"></el-table-column>
        <!--表格数据-->
        <template v-for="item in data.tableConfig.tHead">
            <!--v-Slot-->
            <el-table-column :key="item.prop" v-if="item.columnType==='slot'" :prop="item.prop" :label="item.label"
                             :width="item.width">
                <template slot-scope="scope">
                    <slot :name="item.slotName" :data="scope.row"></slot>
                </template>
            </el-table-column>
            <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                             v-else></el-table-column>
        </template>

    </el-table>
</template>

<script>
    import {reactive, onBeforeMount, watch} from "@vue/composition-api";
    import {tableLoadData} from "./tableLoadData";

    export default {
        name: "tableVue",
        props: {
            config: {
                type: Object,
                default: () => {
                }
            }
        },
        setup: function (props, {root}) {

            const {tableData,LoadingData} =tableLoadData();
            /*          onBeforeMount(() => {});  //挂载前
                        onMounted(()=>{});        //挂载后
                        onBeforeUpdate(()=>{});   //更新前
                        onUpdated(()=>{});        //更新后
                        onBeforeUnmount(()=>{});  //卸载前
                        onUnmounted(()=>{});      //卸载后
            */
            const data = reactive({
                tableConfig: {
                    selections: true,
                    recordCheckBox: false,
                    requestUrl: {},
                    tHead: []
                },
                tableData: []
            });

            //函数
            const initTableConfig = (() => {
                let configData = props.config;
                let keys = Object.keys(data.tableConfig);
                for (let key in configData) {
                    if (keys.includes(key)) {
                        data.tableConfig[key] = configData[key]
                    }
                }
            });

            // const loadData = (() => {
            //     let requestUrl = data.tableConfig.requestUrl;
            //     let requestData = {
            //         url: RequestUrl[requestUrl.url],
            //         method: requestUrl.method,
            //         data: requestUrl.data,
            //     };
            //     LoadTableData(requestData).then((response) => {
            //         let responseData = response.data.data.data;
            //         if (responseData.length>0 && responseData){
            //             data.tableData =responseData;
            //         }
            //
            //     }).catch((error) => {
            //     });
            // });

            //生命周期
            onBeforeMount(() => {
                initTableConfig();
                // loadData();
                LoadingData(data.tableConfig.requestUrl);
            });

            watch(()=> tableData.item,(newValue,oldValue)=>{
                data.tableData=newValue;
            });


            return {
                //对象
                data,

                //函数
                initTableConfig,
            }
        }
    }
</script>

<style scoped>

</style>
