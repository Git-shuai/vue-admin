<template>
    <div>
        <el-form ref="detailedData.form" :model="form" label-width="80px">
            <el-form-item label="信息分类: ">
                <el-select v-model="form.categoryId" placeholder="请选择分类">
                    <el-option v-for="item in detailedData.category" :key="item.id" :value="item.id"
                               :label="item.category_name"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="新闻标题: ">
                <el-input v-model="form.title" type="text"></el-input>
            </el-form-item>

            <el-form-item label="缩略图: ">
                <uploadImg :uploadImg.sync="form.imageUrl" />
                <!--                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :data="detailedData.uploadKey"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>-->
            </el-form-item>

            <el-form-item label="发布日期: ">
                <el-date-picker v-model="form.createDate" type="datetime" placeholder="选择日期时间"
                                disabled></el-date-picker>
            </el-form-item>
            <el-form-item label="详情内容: ">
                <quillEditor v-model="form.content" class="" ref="myQuillEditor"
                             :options="detailedData.editorOption"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit" :loading="detailedData.submitLoading">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {ref, reactive, watch, onMounted} from "@vue/composition-api";
    import {EditInfo, GetInfoList} from "../../api/news";
    import {timestampToTime} from "../../utils/common";

    import uploadImg from "@c/uploadImg";
    import {quillEditor} from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {QiniuToken} from "../../api/common";

    export default {
        name: "infoDetailed",
        components: {quillEditor, uploadImg},
        setup(props, {root}) {
            let id = root.$route.query.id;
            // console.log(id);
            //**************************************************************************************
            //自定义对象
            const detailedData = reactive({
                category: [],
                editorOption: {},
                submitLoading: false, //加载状态
                // uploadKey: {
                //     token: '',
                //     key: ''   //图片名称
                // }
            });

            const form = reactive({
                categoryId: '',
                title: '',
                createDate: '',
                content: '',
                imageUrl: ''
            });
            //*************************************************************************************************
            //函数

            //获取Category
            const getInfoCategory = (() => {
                root.$store.dispatch('Common/getInfoCategory').then((response) => {
                    detailedData.category = response;
                }).catch();
            });

            //获取列表
            const getInfoList = (() => {
                let data = {
                    id: id,
                    pageNumber: 1,
                    pageSize: 1
                };
                // console.log(data);
                new GetInfoList(data).then((response) => {
                    let resData = response.data.data.data[0];
                    form.categoryId = resData.categoryId;
                    form.title = resData.title;
                    form.content = resData.content;
                    form.imageUrl = resData.imageUrl;
                    form.createDate = timestampToTime(resData.createDate);
                }).catch(() => {
                });
            });
            //提交
            const submit = (() => {
                let data = {
                    id: id,
                    title: form.title,
                    categoryId: form.categoryId,
                    content: form.content,
                    imaUrl: form.imageUrl
                };
                console.log(data)
                if (form.title === '') {
                    root.$message({
                        message: "标题不能为空",
                        type: 'error'
                    });
                    return false;
                }
                detailedData.submitLoading = true;
                EditInfo(data).then((response) => {
                    root.$message({
                        message: response.data.message,
                        type: 'success'
                    });
                    detailedData.submitLoading = false;
                }).catch((error) => {
                    detailedData.submitLoading = false;
                });

            });

            /*            const handleAvatarSuccess = ((res, file) => {
                            form.imageUrl = URL.createObjectURL(file.raw);
                        });
                        const beforeAvatarUpload = ((file) => {
                            const isJPG = file.type === 'image/jpeg';
                            const isLt2M = file.size / 1024 / 1024 < 2;

                            if (!isJPG) {
                                this.$message.error('上传头像图片只能是 JPG 格式!');
                            }
                            if (!isLt2M) {
                                this.$message.error('上传头像图片大小不能超过 2MB!');
                            }

                            let suffix = file.name;
                            let key = encodeURI(`${suffix}`);
                            detailedData.uploadKey.key = key;

                            return isJPG && isLt2M;
                        });*/

            /*            //获取七牛云
                        const getQiniuToken = () => {
                            let data = {
                                ak: "",
                                sk: "",
                                buckety: ""
                            };

                            QiniuToken().then((response) => {
                                detailedData.uploadKey.token = response.data.data.token;
                            }).catch((error) => {
                            })
                        };*/

            //////////////////////////////////////////////
            onMounted(() => {
                getInfoCategory();
                getInfoList();
            });

            return {
                // ref,reactive
                detailedData,
                form,
                //函数
                getInfoCategory,
                getInfoList,
                submit,
                // handleAvatarSuccess,
                // beforeAvatarUpload

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/elementui";
</style>
