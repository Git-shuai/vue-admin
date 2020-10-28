<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" @opened="openDialog">
        <el-form :model="form" :ref="form">

            <el-form-item label="用户名: " :label-width="formLabelWidth">
                <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="姓名: " :label-width="formLabelWidth">
                <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="手机号: " :label-width="formLabelWidth">
                <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="地区: " :label-width="formLabelWidth">
                <cityPicker></cityPicker>
            </el-form-item>
            <el-form-item label="是否启用: " :label-width="formLabelWidth">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="角色: " :label-width="formLabelWidth">
                <el-input></el-input>
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

        setup(props, {emit, root}) {
            //*******************************************************************************************
            //ref
            const dialog_info_flag = ref(false);
            const formLabelWidth = ref('80px');

            const data = reactive({});

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
            const submitLoading = ref(false);

            //函数
            //*******************************************************************************************
            watch(() => dialog_info_flag.value = props.flag);

            const restForm = (() => {
                form.content = '';
                form.categoryId = '';
                form.title = '';
            });
            const close = (() => {
                dialog_info_flag.value = false;
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
                submitLoading.value = true;
                AddNews(data).then((response) => {
                    root.$message({
                        message: response.data.message,
                        type: 'success'
                    });
                    submitLoading.value = false;
                    close();
                    restForm();
                }).catch((error) => {
                    submitLoading.value = false;
                });

            });
            //*******************************************************************************************
            //return
            return {
                //ref
                dialog_info_flag,
                formLabelWidth,
                categoryOption,
                submitLoading,

                //reactive
                data,
                form,

                //函数
                close,
                openDialog,
                submit,
                restForm
            }
        }
    }
</script>

<style scoped>

</style>
