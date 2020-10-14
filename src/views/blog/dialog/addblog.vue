<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close">
        <el-form :model="form">

            <el-form-item label="标题: " :label-width="formLabelWidth">
                <el-input v-model="form.name" placeholder="请输入标题"></el-input>
            </el-form-item>

            <el-form-item label="类型: " :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择类型">
                    <el-option label="Java" value="Java"></el-option>
                    <el-option label="Python" value="Python"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容: " :label-width="formLabelWidth" >
                <el-input type="textarea"  v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close" >取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {reactive,watch, ref} from "@vue/composition-api";

    export default {
        name: "addblog",
        //单向数据流
        props: {
            flag: {
                type: Boolean,
                default: false
            }
        },

        setup(props, {emit}) {
            //*******************************************************************************************
            //ref
            const dialog_info_flag = ref(false);
            const formLabelWidth = ref('80px');


            //*******************************************************************************************
            //reactive
            const form = reactive({
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            });

            //函数
            //*******************************************************************************************
            watch(() => dialog_info_flag.value = props.flag);

            const close = (() => {
                dialog_info_flag.value = false;
                //回调是不需要进行逻辑
                emit("update:flag", false);
                // root.$emit('close',false);
            });
            //*******************************************************************************************
            //return
            return {
                //ref
                dialog_info_flag,
                formLabelWidth,

                //reactive
                form,

                //函数
                close
            }
        }
    }
</script>

<style scoped>

</style>
