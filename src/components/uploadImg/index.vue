<template>
    <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :data="data.uploadKey"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <img v-if="data.image" :src="data.image" alt="上传图片" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    import {QiniuToken} from "../../api/common";
    import {ref, reactive, watch, onMounted} from "@vue/composition-api";
    export default {
        name: "uploadImg",
        props:{
            imageUrl: {
                type: String,
                default: ""
            }
        },
        setup(props, {root,emit}) {
            console.log("imgurl",props.imageUrl);
            const data=reactive({
                image: '',
                uploadKey: {
                    token: '',
                    key: ''   //图片名称
                }
            });

            const handleAvatarSuccess = ((res, file) => {
                let imaUrl='';
                data.image = imaUrl;
                emit("update:imageUrl",imaUrl);
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
                data.uploadKey.key = key;

                return isJPG && isLt2M;
            });

            //获取七牛云
            const getQiniuToken = (() => {
                let data = {
                    ak: "",
                    sk: "",
                    buckety: ""
                };

                QiniuToken().then((response) => {
                    data.uploadKey.token = response.data.data.token;
                }).catch((error) => {
                })
            });

            watch(()=>props.imageUrl,(value)=>{
                data.image =value;
            });

            return {
                data,
                //函数
                handleAvatarSuccess,
                beforeAvatarUpload,
                getQiniuToken
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>
