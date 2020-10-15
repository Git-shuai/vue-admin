<template>
    <div id="category">
        <el-button type="danger">添加以及标签</el-button>
        <hr class="hr-wrap">
        <div>
            <el-row :gutter="30">
                <!--左边-->
                <el-col :span="8">
                    <div class="category-wrap">
                        <div class="category">
                            <h4>
                                <svg-icon icon-class="minus" class-name="minus"></svg-icon>
                                新闻
                                <div class="btn-group pull-right">
                                    <el-button size="mini" type="primary" round>编辑</el-button>
                                    <el-button size="mini" type="success" round>添加子级</el-button>
                                    <el-button size="mini" type="danger" round>删除</el-button>
                                </div>
                            </h4>
                            <ul>
                                <li>
                                    全国
                                    <div class="btn-group pull-right">
                                        <el-button size="mini" type="primary" round>编辑</el-button>
                                        <el-button size="mini" type="danger" round>删除</el-button>
                                    </div>
                                </li>
                                <li>全国</li>
                                <li>全国</li>
                                <li>全国</li>
                            </ul>
                        </div>
                        <div class="category">
                            <h4>
                                <svg-icon icon-class="minus" class-name="minus"></svg-icon>
                                新闻
                            </h4>
                            <ul>
                                <li>全国</li>
                                <li>全国</li>
                                <li>全国</li>
                                <li>全国</li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <!--右边-->
                <el-col :span="16">
                    <div>
                        <h4 class="menu-title">一级分类编辑</h4>
                        <el-form label-width="142px" class="from-wrap" :model="form">
                            <el-form-item label="一级分类名称: ">
                                <el-input v-model="form.categoryName"></el-input>
                            </el-form-item>
                            <el-form-item label="二级分类名称: ">
                                <el-input v-model="form.setcategoryName"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" @click="submit">确定</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {AddFirstCategory} from "../../api/news";
    import {ref, reactive} from "@vue/composition-api";

    export default {
        name: "tag",
        setup(props, {root}) {

            //reactive
            const form = reactive({
                categoryName: '',
                setcategoryName: ''
            });


            //函数
            const submit = (() => {
                let data={
                    categoryName: form.categoryName
                };
                new AddFirstCategory(data).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(response)
                });
            });

            //return
            return {

                //reactive
                form,

                //函数
                submit
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
