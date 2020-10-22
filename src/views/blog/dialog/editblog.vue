<template>
    <el-dialog title="修改" :visible.sync="dialog_info_flag" @close="close" @opened="openDialog">
        <el-form :model="form" :ref="form">

            <el-form-item label="标题: "  :label-width="formLabelWidth">
                <el-input v-model="form.title"  placeholder="请输入标题"></el-input>
            </el-form-item>

            <el-form-item label="类型: " :label-width="formLabelWidth">
                <el-select v-model="form.categoryId"  placeholder="请选择类型">
                    <el-option v-for="item in categoryOption.item"
                               :key="item.id"
                               :label="item.category_name"
                               :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容: "  :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.content"  placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close" >取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {reactive, watch, ref} from "@vue/composition-api";
    import {AddNews} from "../../../api/news";

    export default {
        name: "editblog",
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
            watch(() => {dialog_info_flag.value = props.flag});

            const restForm=(()=>{
                form.content='';
                form.categoryId='';
                form.title='';
            });
            const close = (() => {
                dialog_info_flag.value = false;
                //回调是不需要进行逻辑

                emit("update:flag", false);
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
                if (form.title===''){
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
