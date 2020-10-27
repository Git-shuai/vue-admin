<template>
    <el-select v-model="data.selectOption" placeholder="请选择">
        <el-option v-for="item in data.initOption" :key="item.value" :value="item.value"
                   :label="item.label"></el-option>
    </el-select>
</template>

<script>
    import {ref, reactive, watch, onMounted} from "@vue/composition-api";

    export default {
        name: "index",
        props: {
            config: {
                type: Object,
                default: () => {
                }
            }
        },
        setup: function (props, {root}) {
            const data = reactive({
                selectOption: '',
                initOption: [],
                option: [
                    {value: 'name', label: '姓名'},
                    {value: 'phone', label: '手机号'},
                    {value: 'email', label: '邮箱'},
                    {value: 'id', label: 'Id'},
                    {value: 'title', label: '标题'},
                ]
            });

            const initOption = (() => {
                let initData=props.config.init;
                if (initData.length === 0) {
                    return false;
                }
                let optionArr = [];
                initData.forEach(item => {
                    let arr = data.option.filter(elem => elem.value === item);
                    if (arr.length > 0) {
                        optionArr.push(arr[0]);
                    }
                });
                if (optionArr.length === 0) {
                    return false;
                }
                data.initOption = optionArr;
                data.selectOption = optionArr[0].value;
            });

            onMounted(() => {
                initOption();
            });

            return {
                data,
                //函数
                initOption
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
