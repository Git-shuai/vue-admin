<template>
    <div>
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
        <el-pagination
                v-if="data.tableConfig.pagination"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageData.currentPage"
                :page-size="pageData.pageSize"
                :page-sizes="pageData.pageSizeS"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageData.total">
        </el-pagination>
    </div>

</template>

<script>
    import {reactive, onBeforeMount, watch} from "@vue/composition-api";
    import {tableLoadData} from "./tableLoadData";
    import {paginationHook} from "./pagInationHook";
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

            const {tableData, LoadingData} = tableLoadData();
            const {pageData, handleSizeChange, handleCurrentChange, totalCount} = paginationHook();
            /*          onBeforeMount(() => {});  //挂载前
                        onMounted(()=>{});        //挂载后
                        onBeforeUpdate(()=>{});   //更新前
                        onUpdated(()=>{});        //更新后
                        onBeforeUnmount(()=>{});  //卸载前
                        onUnmounted(()=>{});      //卸载后
            */
            /**
             * 页面加载的数据
             */
            const data = reactive({
                tableConfig: {
                    selections: true,
                    recordCheckBox: false,
                    requestData: {},
                    tHead: [],
                    pagination: true
                },
                tableData: []
            });

            //函数
            /**
             * 父组件向子组件传值，用for循环赋值
             */
            const initTableConfig = (() => {
                let configData = props.config;
                let keys = Object.keys(data.tableConfig);
                for (let key in configData) {
                    if (keys.includes(key)) {
                        data.tableConfig[key] = configData[key]
                    }
                }
            });


            //生命周期
            /**
             * 挂载之前
             */
            onBeforeMount(() => {
                initTableConfig();
                LoadingData(data.tableConfig.requestData);
            });

            /**
             * 监听 从数据库中得到的数据
             */
            watch([
                () => tableData.item,
                () => tableData.total
            ], ([tableData, total]) => {
                data.tableData = tableData;
                totalCount(total);
            });


            /**
             * 监听分页组件的页码变化
             */
            watch([
                () => pageData.currentPage,
                () => pageData.pageSize
            ], ([currentPage, pageSize]) => {
                let requestData = data.tableConfig.requestData;
                if (requestData.data) {
                    requestData.data.pageNumber = currentPage;
                    requestData.data.pageSize = pageSize;
                    LoadingData(data.tableConfig.requestData);
                }
            });


            return {
                //对象
                data,
                //函数
                initTableConfig, pageData, handleSizeChange, handleCurrentChange
            }
        }
    }
</script>

<style scoped>

</style>
