<template>
    <div id="category">
        <el-button type="danger" @click="addFirst({type: 'category_1_add' })">添加一级标签</el-button>
        <hr class="hr-wrap">
        <div>
            <el-row :gutter="30">
                <!--左边-->
                <el-col :span="8">
                    <div class="category-wrap">
                        <div class="category" v-for="item in category.item" :key="item.id">
                            <h4>
                                <svg-icon icon-class="minus" class-name="minus"></svg-icon>
                                {{item.category_name}}
                                <div class="btn-group pull-right">
                                    <el-button size="mini" type="primary" round
                                               @click="editCategory({ categoryObject : item ,
                                                                       type: 'category_1_edit' })">编辑
                                    </el-button>
                                    <el-button size="mini" type="success" round>添加子级</el-button>
                                    <el-button size="mini" type="danger" round @click="deleteCategory(item.id)">删除
                                    </el-button>
                                </div>
                            </h4>
                            <ul v-if="item.children">
                                <li v-for="children in item.children" :key="children.id">
                                    {{children.category_name}}
                                    <div class="btn-group pull-right">
                                        <el-button size="mini" type="primary" round>编辑</el-button>
                                        <el-button size="mini" type="danger" round>删除</el-button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <!--右边-->
                <el-col :span="16">
                    <div>
                        <h4 class="menu-title">一级分类编辑</h4>
                        <el-form ref="categoryForm" label-width="142px" class="from-wrap" :model="categoryForm">
                            <el-form-item label="一级分类名称: " v-if="category_1">
                                <el-input v-model="categoryForm.categoryName"
                                          :disabled="category_1_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="二级分类名称: " v-if="category_2">
                                <el-input v-model="categoryForm.setcategoryName"
                                          :disabled="category_2_disabled"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" @click="submit" :loading="submit_loading"
                                           :disabled="category_3_disabled">确定
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {AddFirstCategory, DelCategory, EditFirstCategory, GetCategory} from "../../api/news";
    import {onMounted, reactive, ref, watch} from "@vue/composition-api";
    import {global} from "../../utils/global";
    import {common} from "../../api/common";


    export default {
        name: "tag",
        setup: function (props, {refs, root}) {
            const {confirm} = global();
            const {getInfoCategory,commonCategory} = common();
            //ref
            //***************************************************************************************************
            const category_1 = ref(true);
            const category_2 = ref(true);
            const submit_loading = ref(false);
            const category_1_disabled = ref(true);
            const category_2_disabled = ref(true);
            const category_3_disabled = ref(true);
            const deleteId = ref('');
            const submit_btn_type = ref('');


            //reactive
            //***************************************************************************************************
            const categoryForm = reactive({
                categoryName: '',
                setcategoryName: ''
            });
            const category = reactive({
                item: [],
                current: []
            });


            //函数
            //***************************************************************************************************
            const submit = (() => {
                if (submit_btn_type.value === 'category_1_add') {
                    //添加
                    addCategory();
                } else if (submit_btn_type.value === 'category_1_edit') {
                    editFirstCategory();
                } else {
                }


            });

            //添加一级分类
            const addCategory = (() => {
                if (!categoryForm.categoryName) {
                    root.$message({
                        message: "分类名称不能为空",
                        type: "error"
                    });
                    return false;
                }
                submit_loading.value = true;
                let data = {
                    categoryName: categoryForm.categoryName
                };
                new AddFirstCategory(data).then((response) => {
                    if (response.data.resCode === 0) {
                        root.$message({
                            message: response.data.message,
                            type: "success"
                        });
                    }
                    category.item.push(response.data.data);
                    submit_loading.value = false;
                    // refs.categoryForm.resetFields();
                    categoryForm.categoryName = '';
                    categoryForm.setcategoryName = '';
                }).catch((error) => {
                    submit_loading.value = false;
                    refs.categoryForm.resetFields();
                });
            });

            //修改
            const editFirstCategory = (() => {
                if (category.current.length === 0) {
                    root.$message({message: "分类名称不能为空", type: "warning"});
                    return false;
                }


                let data = {
                    id: category.current.id,
                    categoryName: categoryForm.categoryName
                };
                new EditFirstCategory(data).then((response) => {
                    root.$message({message: "修改成功", type: "success"});
                    categoryForm.categoryName = '';
                    category.current = [];
                    getCategory();
                }).catch();
            });

            //按钮
            const addFirst = ((param) => {
                submit_btn_type.value = param.type;
                console.log(submit_btn_type.value);
                category_1.value = true;
                category_2.value = false;
                category_1_disabled.value = false;
                category_3_disabled.value = false;
            });

            // //获取
            // const getCategory = (() => {
            //     new GetCategory().then((response) => {
            //         category.item = response.data.data.data;
            //     }).catch((error) => {
            //     });
            // });

            //删除
            const deleteCategory = ((dataID) => {
                deleteId.value = dataID;
                confirm({
                    content: "你确定要删除该一级分类?",
                    fn: delCategory
                })
            });

            const delCategory = (() => {
                DelCategory({categoryId: deleteId.value}).then((response) => {
                    root.$message({message: "删除成功", type: "success"});
                    // getCategory();
                    //第一种 两个参数删除 三个是修改，新增
                    let index = category.item.findIndex((item) => item.id === deleteId.value);
                    category.item.splice(index, 1);
                    //第二种
                    // let newData = category.item.filter((item) => item.id !== deleteId.value);
                    // category.item=newData;
                }).catch((error) => {
                    getCategory();
                });
            });

            //修改
            const editCategory = ((param) => {
                //修改状态
                category_2.value = false;
                category_1_disabled.value = false;
                category_3_disabled.value = false;
                categoryForm.categoryName = param.categoryObject.category_name;
                submit_btn_type.value = param.type;
                category.current = param.categoryObject;
                console.log(category.current);
            });

            //生命周期
            //***************************************************************************************************
            onMounted(() => {
                getInfoCategory();
            });
            watch(()=> commonCategory.item,(value)=>{
                console.log(value);
                category.item = value;
            });

            //return
            //***************************************************************************************************
            return {

                //ref
                category_1,
                category_2,
                submit_loading,
                category_1_disabled,
                category_2_disabled,
                category_3_disabled,
                deleteId,
                submit_btn_type,

                //reactive
                categoryForm,
                category,

                //函数
                submit,
                addCategory,
                addFirst,
                deleteCategory,
                delCategory,
                editCategory,
                editFirstCategory
            }

        }
    }
</script>

<style lang="scss" scoped>
    .category-wrap {
        div:first-child {
            &:before {
                top: 20px;
            }
        }

        div:last-child {
            &:before {
                bottom: 21px;
            }
        }
    }

    .menu-title {
        line-height: 44px;
        background-color: #f3f3f3;
        padding-left: 22px;
    }

    .category {
        position: relative;
        line-height: 44px;
        cursor: pointer;

        &:before {
            content: '';
            position: absolute;
            left: 22px;
            top: 0;
            bottom: 0;
            width: 32px;
            border-left: 1px dotted #000;
        }

        h4 {
            padding-left: 40px;
        }

        svg {
            position: absolute;
            left: 15px;
            top: 15px;
            background-color: #fff;
            font-size: 17px;
        }

        li {
            position: relative;
            padding-left: 36px;
            margin-left: 24px;

            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 22px;
                width: 32px;
                border-bottom: 1px dotted #000;
            }
        }

        li, h4 {
            @include webkit(transition, all .5s ease 0s);

            &:hover {
                .btn-group {
                    display: block;
                }

                background-color: #f3f3f3;
            }
        }

        .btn-group {
            display: none;
            font-size: 9px;
        }
    }

    .from-wrap {
        width: 450px;
        margin-top: 22px;
    }

    .hr-wrap {
        margin: 30px -1px 30px -30px;
        border: none;
        border-bottom: 1px solid #e9e9e9;
    }

</style>
