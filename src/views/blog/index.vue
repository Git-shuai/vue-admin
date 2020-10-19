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
                        <el-select v-model="searchKey">
                            <el-option
                                    style="width: 100%"
                                    v-for="item in searchOptions"
                                    :key="item.id"
                                    :value="item.value"
                                    :label="item.label">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>

            <el-col :span="3">
                <el-input v-model="searchKey" placeholder="请输入内容" style="width: 100%"></el-input>
            </el-col>

            <el-col :span="2">
                <el-button type="danger" class="pull-left" style="width: 100%">查询</el-button>
            </el-col>


            <el-col :span="2">
                <el-button class="pull-right" type="danger" style="width: 100%" @click="dialogBlog=true">新增</el-button>
            </el-col>
        </el-row>

        <div class="block-space-30"></div>

        <!--表格-->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                    type="selection"
                    width="45">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="550"></el-table-column>
            <el-table-column prop="category" label="类别" width="160"></el-table-column>
            <el-table-column prop="date" label="日期" width="250"></el-table-column>
            <el-table-column prop="user" label="作者" width="200"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="dialogBlog=true">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteItem">删除
                    </el-button>
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
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total,sizes,prev, pager, next,jumper"
                        :total="1000">
                </el-pagination>
            </el-col>
        </el-row>

        <!--新增弹窗-->
        <addblog :flag.sync="dialogBlog" @close="closeDialog"/>

    </div>
</template>

<script>
    import {ref, reactive,watch, onMounted} from "@vue/composition-api";
    import addblog from "./dialog/addblog";
    import {global} from "../../utils/global";
    import {common} from "../../api/common";

    export default {
        name: "blogIndex",
        components: {addblog},
        setup(props, {root}) {
            //声明
            const {confirm} = global();
            const {getInfoCategory,commonCategory} = common();
            //自定义数据
            //************************************************************************************************
            //ref
            const categoryValue = ref('');
            const searchKey = ref('title');
            //新增弹窗标记
            const dialogBlog = ref(false);


            // reactive
            //默认时间
            const dateValue = reactive([new Date(2020, 10, 10, 10, 10), new Date(2020, 10, 11, 10, 10)]);

            //搜索关键字
            const searchOptions = reactive([
                {value: "title", label: "标题"},
                {value: "author", label: "作者"}
            ]);

            const options = reactive({
                category: []
            });

            const tableData = reactive([
                {
                    title: 'Java原理',
                    category: 'Java',
                    date: '2020-09-12 00:00:00',
                    user: '昝存'
                }, {
                    title: 'Java原理',
                    category: 'Java',
                    date: '2020-09-12 00:00:00',
                    user: '昝存'
                }, {
                    title: 'Java原理',
                    category: 'Java',
                    date: '2020-09-12 00:00:00',
                    user: '昝存'
                }, {
                    title: 'Java原理',
                    category: 'Java',
                    date: '2020-09-12 00:00:00',
                    user: '昝存'
                }, {
                    title: 'Java原理',
                    category: 'Java',
                    date: '2020-09-12 00:00:00',
                    user: '昝存'
                },
            ]);
            //自定义函数
            //************************************************************************************************

            const handleSizeChange = ((value) => {
                console.log(value)
            });

            const handleCurrentChange = ((value) => {
                console.log(value)
            });

            //回调函数
            const closeDialog = (() => {
                dialogBlog.value = false;
            });

            const deleteItem = (() => {
                confirm({
                    content: "你确定要删除该信息?"
                })
            });
            const deleteAll = (() => {
                confirm({
                    content: "你确定要删除你所选着的所有信息?"
                })
            });


            //////////////////////////////////////////////
            onMounted(() => {
                getInfoCategory();
            });

            watch(()=> commonCategory.item,(value)=>{
                console.log(value);
                options.category = value;
            });

            //返回
            //************************************************************************************************
            return {
                //ref
                categoryValue,
                dialogBlog,
                searchKey,

                //reactive
                options,
                dateValue,
                searchOptions,
                tableData,

                //函数
                handleSizeChange,
                handleCurrentChange,
                closeDialog,
                deleteItem,
                deleteAll,
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

</style>
