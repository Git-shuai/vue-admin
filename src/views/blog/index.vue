<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-row :gutter="30">
                <el-col :span="3">
                    <div class="label-wrap category">
                        <label for="">类型 :</label>
                        <div class="wrap-content">
                            <el-select v-model="value" filterable="true" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>

                <el-col :span="7">
                    <div class="label-wrap date">
                        <label for="">日期 :\u3000{}</label>
                        <div class="wrap-content">
                            <el-date-picker
                                    style="width: 100%"
                                    v-model="value2"
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
                        <label for="">关键字 :</label>
                        <div class="wrap-content">
                            <el-select v-model="search_key">
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
                    <el-input v-model="serch_keyWork" placeholder="请输入内容"  style="width: 100%"></el-input>
                </el-col>

                <el-col :span="2">
                    <el-button type="danger" class="pull-left" >查询</el-button>
                </el-col>



                <el-col :span="5">
                    <el-button class="pull-right" type="danger">新增</el-button>
                </el-col>
            </el-row>
        </el-form>

    </div>
</template>

<script>
    import {ref, reactive} from "@vue/composition-api";

    export default {
        name: "blogIndex",
        setup() {
            //自定义数据
            //************************************************************************************************
            const options = reactive([{
                value: '选项1',
                label: 'Java'
            }, {
                value: '选项2',
                label: 'Python'
            }, {
                value: '选项3',
                label: 'Mysql'
            }, {
                value: '选项4',
                label: 'Php'
            }, {
                value: '选项5',
                label: 'JavaWeb'
            }]);
            const value = ref('');

            const value1 = reactive([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]);
            const value2 = ref("");

            //搜索关键字
            const searchOptions = reactive([
                {value: "title", label: "标题"},
                {value: "author", label: "作者"}
            ]);
            const search_key = ref('title');
            //自定义函数
            //************************************************************************************************

            //返回
            //************************************************************************************************
            return {
                options,
                value,
                value1,
                value2,
                searchOptions,
                search_key
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
