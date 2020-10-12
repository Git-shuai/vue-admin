<template>
        <svg :class="svgClass" aria-hidden="true">
            <use :xlink:href="iconName"></use>
        </svg>
</template>

<script>
    import {reactive, ref, onMounted,computed} from "@vue/composition-api";

    export default {
        name: "svgicon",
        // props: ['iconClass','className'],
        props: {
            iconClass: {
                type: String,
                default: ''
                // type: Array,  //定义接受的参数是String类型
                // default: () => [],       //默认数据
                // required: true,     //required 必须传值不传报错
                // validator: (value) => {
                //     return value === 'iconClass';
                // }
            },
            className: {
                type: String,  //定义接受的参数是String类型
                default: ''
            }
        },

        setup(props) {
            //**********************************************************************************
            const iconName=computed(()=> `#icon-${props.iconClass}`);
            const svgClass = computed(()=>{
                if (props.className){
                    return `svg-icon ${props.className}`;
                }else {
                    return `svg-icon`;
                }
            }) ;









            // 返回数据
            //****************************************************************************
            return {
                iconName,
                svgClass
            }
        }
    }
</script>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;//添加这一行可以修改SVG 图片的颜色
}
</style>
