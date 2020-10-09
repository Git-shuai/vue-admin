<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}"
                    @click="toggleMenu(item,ruleForm)">
                    {{item.txt}}
                </li>
            </ul>
            <!--表单的开始-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">

                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20"
                              minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-form" v-if="menuTab[1].current">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20"
                              minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="24">
                        <el-col :span="14">
                            <el-input v-model.number="ruleForm.code" maxlength="6" minlength="6"></el-input>
                        </el-col>
                        <el-col :span="10">
                            <el-button type="success" class="block" @click="getSms()">获取验证码</el-button>
                        </el-col>
                    </el-row>

                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block"
                               :disabled="loginBtnStatus">{{ menuTab[0].current ? "登录":
                        "注册"}}
                    </el-button>
                </el-form-item>
            </el-form>
            <!--表单的结束-->
        </div>
    </div>
</template>
<script>
    import {getSMS} from "@/api/login"
    import {reactive, ref, onMounted} from "@vue/composition-api";
    import {validateEmail, validatePwd, validateCode} from "@/utils/validate";

    export default {
        name: "login",
        /*
        attrs: (...) =》this.$attrs
        emit: (...)  => this.$emit
        isServer: (...)
        listeners: (...)
        parent: (...)
        refs: (...)
        root: (...) =>this
        slots: {}
        ssrContext:
        * */
        // setup: function (props, context) {
        setup: function (props, {refs, root}) {
            //放置data 数据 声明周期 自定义函数
            // console.log(context);
            //对象类型 reactive
            const menuTab = reactive([
                {txt: "登录", current: true},
                {txt: "注册", current: false}
            ]);
            // console.log(menuTab);

            //基本数据类型用 ref
            const isActive = ref(true);
            // console.log(isActive.value);

            //登录按钮禁用状态
            const loginBtnStatus = ref(false);

            //表单绑定数据
            const ruleForm = reactive({
                username: '',
                password: '',
                passwords: '',
                code: ''
            });

            //验证方法开始
            //验证邮箱
            let validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱号'));
                } else if (validateEmail(value)) {
                    callback(new Error('邮箱格式错误'));
                } else {
                    callback();
                }
            };
            //验证密码
            let validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (validatePwd(value)) {
                    callback(new Error('密码是6-20位数字和字母组成'));
                } else {
                    callback();
                }
            };
            //验证重复密码
            let validatePasswords = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (validatePwd(value)) {
                    callback(new Error('密码是6-20位数字和字母组成'));
                } else if (value !== ruleForm.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };
            //验证验证码
            let checkCode = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('验证码不能为空'));
                } else if (validateCode(value)) {
                    callback(new Error('验证码为6位数字'));
                } else {
                    callback();
                }
            };
            //表单的验证
            const rules = reactive({
                username: [
                    {validator: validateUsername, trigger: 'blur'}
                ],
                password: [
                    {validator: validatePassword, trigger: 'blur'}
                ],
                passwords: [
                    {validator: validatePasswords, trigger: 'blur'}
                ],
                code: [
                    {validator: checkCode, trigger: 'blur'}
                ]
            });
            //验证方法结束

            //挂载完成后
            onMounted(() => {

            });

            //自定义函数开始
            //高光效果
            const toggleMenu = (data => {
                // this.$refs[ruleForm].resetFields();
                menuTab.forEach(elem => {
                    elem.current = false;
                });
                data.current = true;
            });
            //登录
            const submitForm = (formName => {
                refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            });
            //获取验证码
            const getSms = (() => {
                //提示信息
                if (ruleForm.username == '') {
                    root.$message.error('邮箱不能为空');
                    return false;
                }
                if (validateEmail(ruleForm.username)) {
                    root.$message.error('邮箱格式错误，请重新输入');
                    return false;
                }

                let data = {
                    username: ruleForm.username,
                    module: 'login'
                };
                new getSMS(data).then(response => {

                }).catch(error => {
                    console.log(error)
                });
            });
            //自定义函数结束
            return {
                menuTab,
                ruleForm,
                rules,
                toggleMenu,
                submitForm,
                getSms,
                loginBtnStatus
            }
        }
    };
</script>

<style lang="scss" scoped>
    #login {
        height: 100vh;
        background-color: #344a5f;
    }

    .login-wrap {
        width: 330px;
        margin: auto;
    }

    //菜单
    .menu-tab {
        text-align: center;

        li {
            display: inline-block;
            width: 88px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
        }

        //高光效果
        .current {
            background-color: rgba(0, 0, 0, .1);
        }
    }

    //登录表单
    .login-form {
        margin-top: 29px;

        label {
            display: block;
            margin-bottom: 3px;
            font-size: 14px;
            color: #fff;
        }

        .item-form {
            margin-bottom: 13px;
        }

        .block {
            display: block;
            width: 100%;
        }

        .login-btn {
            margin-top: 19px;
        }
    }
</style>
