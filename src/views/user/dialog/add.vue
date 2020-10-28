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

            const data = reactive({
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }]
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
