<template>
    <el-dialog title="新增" :visible.sync="data.dialog_info_flag" @close="close" @opened="openDialog">
        <el-form :model="form" :ref="form">
            <el-form-item label="用户名: " :label-width="data.formLabelWidth">
                <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="姓名: " :label-width="data.formLabelWidth">
                <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="手机号: " :label-width="data.formLabelWidth">
                <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="地区: " :label-width="data.formLabelWidth">
                <cityPicker :cityPickerData.sync="data.cityPickerData"></cityPicker>
            </el-form-item>
            <el-form-item label="是否启用: " :label-width="data.formLabelWidth">
                <div style="margin-top: 8px">
                    <el-switch
                            v-model="data.switchStatus"
                            style="display: block"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="正常"
                            inactive-text="禁用">
                    </el-switch>
                </div>
            </el-form-item>
            <el-form-item label="角色: " :label-width="data.formLabelWidth">
                <el-checkbox-group v-model="data.checkboxRole" @change="checkboxChange">
                    <el-checkbox value="1" label="超管"></el-checkbox>
                    <el-checkbox value="2" label="VIP"></el-checkbox>
                    <el-checkbox value="3" label="普通用户"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {reactive, watch, ref} from "@vue/composition-api";
    import {AddNews} from "../../../api/news";
    import cityPicker from "@c/cityPicker";

    export default {
        name: "addblog",
        components: {cityPicker},
        //单向数据流
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            category: {
                type: Array,
                default: () => {
                }
            }
        },
        setup: function (props, {emit, root}) {
            //*******************************************************************************************
            const data = reactive({
                cityPickerData: {},
                dialog_info_flag: false,
                formLabelWidth: '80px',
                submitLoading: false,
                switchStatus: true,
                checkboxRole: []
            });

            //*******************************************************************************************
            //reactive
            const form = reactive({
                categoryId: '',
                title: '',
                content: ''
            });
            const categoryOption = reactive({
                item: []
            });

            //函数
            //*******************************************************************************************
            watch(() => data.dialog_info_flag = props.flag);

            /**
             *  选择checkboxChange改变时改变绑定的值
             */
            const checkboxChange = ((value) => {
                data.checkboxRole = [];
                let number = value.length-1;
                data.checkboxRole[0] = value[number];
                console.log(data.checkboxRole[0])
            });

            const restForm = (() => {
                form.content = '';
                form.categoryId = '';
                form.title = '';
            });
            const close = (() => {
                data.dialog_info_flag = false;
                //回调是不需要进行逻辑

                emit("update:flag", false);
                emit("close");
                // root.$emit('close',false);
                restForm();
            });

            const openDialog = (() => {
                categoryOption.item = props.category;
            });
            const submit = (() => {
                let data = {
                    title: form.title,
                    categoryId: form.categoryId,
                    content: form.content
                };
                if (form.title === '') {
                    root.$message({
                        message: "标题不能为空",
                        type: 'error'
                    });
                    return false;
                }
                data.submitLoading = true;
                AddNews(data).then((response) => {
                    root.$message({
                        message: response.data.message,
                        type: 'success'
                    });
                    data.submitLoading = false;
                    close();
                    restForm();
                }).catch((error) => {
                    data.submitLoading = false;
                });

            });
            //*******************************************************************************************
            //return
            return {
                categoryOption,
                //reactive
                data,
                form,

                //函数
                close,
                openDialog,
                submit,
                restForm,
                checkboxChange
            }
        }
    }
</script>

<style scoped>

</style>
