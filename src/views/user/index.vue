<template>
    <div>
        <el-row>
            <el-col :span="20">
                <div class="label-wrap">
                    <label>关键字:</label>
                    <div class="wrap-content">
                        <el-row :gutter="16">
                            <el-col :span="3">
                                <SelectVue :config="data.configOption"></SelectVue>
                            </el-col>
                            <el-col :span="5">
                                <el-input placeholder="请输入搜索的关键字"></el-input>
                            </el-col>
                            <el-col :span="15">
                                <el-button type="danger">查询</el-button>
                            </el-col>
                        </el-row>

                    </div>
                </div>
            </el-col>


            <el-col :span="4">
                <el-button type="danger">新增</el-button>
            </el-col>
        </el-row>
        <div class="block-space-30"></div>
        <TableVue :config="data.configTable">
            <template v-slot:status="slotData">
                <el-switch v-model="slotData.data.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <template v-slot:operation="slotData">
                <el-button size="small" type="danger" @click="operation(slotData.data)">删除</el-button>
                <el-button size="small" type="primary">编辑</el-button>
            </template>

        </TableVue>
    </div>
</template>

<script>
    import SelectVue from "@c/select";
    import TableVue from "@c/table";
    import {reactive} from "@vue/composition-api";

    export default {
        name: "index",
        components: {SelectVue, TableVue},
        setup(props, {root}) {

            const data = reactive({
                //下拉选框
                configOption: {
                    init: ["name", "email", "phone"]
                },
                //Table配置
                configTable: {
                    //多选框
                    selections: false,
                    //翻页记录
                    recordCheckBox: true,
                    //表头
                    tHead: [
                        {
                            label: '邮箱/用户名',
                            prop: 'email',
                            width: 200
                        }, {
                            label: '真实姓名',
                            prop: 'name',
                            width: 120
                        }, {
                            label: '手机号',
                            prop: 'phone'
                        }, {
                            label: '地区',
                            prop: 'address'
                        }, {
                            label: '角色',
                            prop: 'role'
                        }, {
                            label: '禁用状态',
                            prop: 'status',
                            columnType: 'slot',
                            slotName: "status"
                        }, {
                            label: '操作',
                            columnType: 'slot',
                            slotName: "operation"
                        }
                    ],
                    requestData: {
                        url: "getUserList",
                        method: "post",
                        data: {
                            pageNumber: 1,
                            pageSize: 10
                        }
                    } ,  //请求URL
                    pagination: true

                }
            });

            //函数
            const operation = ((value) => {
                console.log(value);
            });


            return {
                data,

                //函数
                operation
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../styles/config";

    .label-wrap {
        @include labelDemo(left, 60, 40);
    }

</style>
