<template>
    <div>
        <el-row :gutter="30">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label>分类 :</label>
                    <div class="wrap-content">
                        <el-select v-model="categoryValue" placeholder="请选择">
                            <el-option
                                    v-for="item in options.category"
                                    :key="item.id"
                                    :label="item.category_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="label-wrap date">
                    <label>日期 :</label>
                    <div class="wrap-content">
                        <el-date-picker
                                style="width: 100%"
                                v-model="dateValue"
                                type="datetimerange"
                                align="right"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['12:00:00', '08:00:00']">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>

            <el-col :span="4">
                <div class="label-wrap key-word">
                    <label>关键字 :</label>
                    <div class="wrap-content">
                        <SelectVue :config="data.configOption"></SelectVue>
                        <!--                        <el-select v-model="searchKey">-->
                        <!--                            <el-option-->
                        <!--                                    style="width: 100%"-->
                        <!--                                    v-for="item in searchOptions"-->
                        <!--                                    :key="item.id"-->
                        <!--                                    :value="item.value"-->
                        <!--                                    :label="item.label">-->
                        <!--                            </el-option>-->
                        <!--                        </el-select>-->
                    </div>
                </div>
            </el-col>

            <el-col :span="3">
                <el-input v-model="searchKeyWord" placeholder="请输入内容" style="width: 100%"></el-input>
            </el-col>

            <el-col :span="2">
                <el-button type="danger" class="pull-left" style="width: 100%" @click="getInfoList">查询</el-button>
            </el-col>


            <el-col :span="2">
                <el-button class="pull-right" type="danger" style="width: 100%" @click="dialogBlog=true">新增</el-button>
            </el-col>
        </el-row>

        <div class="block-space-30"></div>

        <!--表格-->
        <el-table :data="tableData.item" border v-loading="loadingData" style="width: 100%"
                  @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="45">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="550"></el-table-column>
            <el-table-column prop="categoryId" label="类别" width="160" :formatter="toCategory"></el-table-column>
            <el-table-column prop="createDate" label="日期" :formatter="toDate" width="250"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="editInfo(scope.row)">编辑</el-button>
                    <!--                    <router-link :to="{name:'InfoDetailed',query:{id: scope.row.id}}">-->
                    <!--                        <el-button size="mini" class="detailed" type="primary">编辑详情</el-button>-->
                    <!--                    </router-link>-->
                    <el-button size="mini" class="detailed" type="primary" @click="detailed(scope.row)">编辑详情</el-button>
                    <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block-space-30"></div>
        <!--分页按钮-->
        <el-row>
            <el-col :span="12">
                <el-button size="mini" @click="deleteAll">批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                        class="pull-right"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total,sizes,prev, pager, next,jumper"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-row>

        <!--新增弹窗-->
        <addblog :flag.sync="dialogBlog" @close="getInfoList" :category="options.category"/>
        <!--修改弹窗-->
        <editblog :flag.sync="dialogBlog_edit" @close="getInfoList" :editData="editDataId.item"
                  :category="options.category"/>
    </div>
</template>

<script>
    import SelectVue from "@c/select";
    import {ref, reactive, watch, onMounted} from "@vue/composition-api";
    import addblog from "./dialog/addblog";
    import editblog from "./dialog/editblog";
    import {global} from "../../utils/global";
    import {DeleteInfo, GetInfoList} from "../../api/news";
    import {timestampToTime} from "../../utils/common";
    // import {common} from "../../api/common";

    export default {
        name: "blogIndex",
        components: {addblog, editblog,SelectVue},
        setup: function (props, {root}) {
            //声明
            const {confirm} = global();
            // const {getInfoCategory,commonCategory} = common();
            //自定义数据
            //************************************************************************************************
            //ref
            const categoryValue = ref('');
            const searchKey = ref('title');
            const searchKeyWord = ref('');
            //新增弹窗标记
            const dialogBlog = ref(false);
            const dialogBlog_edit = ref(false);
            const total = ref(0);
            const loadingData = ref(false);
            const deleteInfoId = ref('');
            //默认时间
            const dateValue = ref('');
            // reactive
            const editDataId = reactive({
                item: {}
            });
            const data = reactive({
                configOption: {
                    init: ["id", "title"]
                }
            });

            //搜索关键字
            const searchOptions = reactive([
                {value: "title", label: "标题"},
                {value: "id", label: "ID"}
            ]);

            const options = reactive({
                category: []
            });

            const tableData = reactive({
                item: []
            });

            const page = reactive({
                pageNum: 1,
                pageSize: 10
            });

            //自定义函数
            //************************************************************************************************

            const handleSizeChange = ((value) => {
                page.pageSize = value;
                getInfoList()
            });

            const handleCurrentChange = ((value) => {
                page.pageNum = value;
                getInfoList()
            });


            //回调函数
            const closeDialog = (() => {
                dialogBlog.value = false;
            });

            const deleteInfo = (() => {
                new DeleteInfo({id: deleteInfoId.value}).then((response) => {
                    getInfoList();
                }).catch();
            });

            const deleteItem = ((id) => {
                deleteInfoId.value = [id];
                confirm({
                    content: "你确定要删除该信息?",
                    fn: deleteInfo
                })
            });

            const handleSelectionChange = ((value) => {
                let id = value.map(item => item.id);
                deleteInfoId.value = id;
            });

            const deleteAll = (() => {
                if (!deleteInfoId.value || deleteInfoId.value.length === 0) {
                    root.$message({
                        message: "请选择你要删除的数据",
                        type: "error"
                    });
                    return false;
                }
                confirm({
                    content: "你确定要删除你所选着的所有信息?",
                    fn: deleteInfo
                })
            });
            //获取Category
            const getInfoCategory = (() => {
                root.$store.dispatch('Common/getInfoCategory').then((response) => {
                    options.category = response;
                }).catch();
            });

            const format = (() => {
                let data = {
                    pageNumber: page.pageNum,
                    pageSize: page.pageSize
                };
                if (categoryValue.value) {
                    data.categoryId = categoryValue.value
                }
                if (dateValue.value.length > 0) {
                    data.startTiem = dateValue.value[0];
                    data.endTime = dateValue.value[1];
                }
                if (searchKeyWord.value) {
                    data[searchKey.value] = searchKeyWord.value;
                }
                return data;
            });

            //获取列表
            const getInfoList = (() => {
                let data = format();
                loadingData.value = true;
                new GetInfoList(data).then((response) => {
                    let resData = response.data.data;
                    tableData.item = resData.data;
                    total.value = resData.total;
                    loadingData.value = false;
                }).catch(() => {
                    loadingData.value = false;
                });
            });

            const toDate = ((row, column, cellValue, index) => {
                return timestampToTime(row.createDate)
            });

            const toCategory = ((row) => {
                let categoryId = row.categoryId;
                // console.log(categoryId);
                let categoryData = options.category.filter(item => item.id === categoryId)[0];
                // console.log(categoryData);
                return categoryData.category_name;
            });

            //修改
            const editInfo = ((value) => {
                // console.log(value.toString());
                editDataId.item = value;
                dialogBlog_edit.value = true;
            });

            const detailed = ((row) => {
                root.$router.push({
                    name: 'InfoDetailed',
                    query: {
                        id: row.id
                    }
                })
            });

            //////////////////////////////////////////////
            onMounted(() => {
                getInfoCategory();
                getInfoList();
            });

            // watch(()=> commonCategory.item,(value)=>{
            //     console.log(value);
            //     options.category = value;
            // });

            //返回
            //************************************************************************************************
            return {
                //ref
                categoryValue,
                dialogBlog,
                searchKey,
                total,
                page,
                loadingData,
                deleteInfoId,
                dateValue,
                searchKeyWord,
                dialogBlog_edit,
                editDataId,
                data,

                //reactive
                options,
                searchOptions,
                tableData,

                //函数
                handleSizeChange,
                handleCurrentChange,
                closeDialog,
                deleteItem,
                deleteAll,
                getInfoList,
                toDate,
                toCategory,
                deleteInfo,
                handleSelectionChange,
                editInfo,
                detailed
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/config";

    .label-wrap {
        &.category {
            @include labelDemo(left, 60, 40);
        }

        &.date {
            @include labelDemo(left, 60, 40);
        }

        &.key-word {
            @include labelDemo(left, 70, 40);
        }
    }

    .detailed {
        margin: 0 12px;
    }

</style>
