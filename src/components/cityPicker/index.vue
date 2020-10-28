<template>
    <div class="overflow-h">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-select v-model="data.provinceValue" @change="handleProvince">
                    <el-option
                            v-for="item in data.provinceData"
                            :key="item.PROVINCE_CODE"
                            :label="item.PROVINCE_NAME"
                            :value="item.PROVINCE_CODE">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="data.cityValue" @change="handleCity">
                    <el-option
                            v-for="item in data.cityData"
                            :key="item.CITY_CODE"
                            :label="item.CITY_NAME"
                            :value="item.CITY_CODE">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="data.areaValue" @change="handleArea">
                    <el-option
                            v-for="item in data.areaData"
                            :key="item.AREA_CODE"
                            :label="item.AREA_NAME"
                            :value="item.AREA_CODE">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="data.streetValue">
                    <el-option
                            v-for="item in data.streetData"
                            :key="item.STREET_CODE"
                            :label="item.STREET_NAME"
                            :value="item.STREET_CODE">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {GetCityPicker} from "../../api/common";
    import {reactive} from "@vue/composition-api";

    export default {
        name: "cityPicker",
        setup(props, {root}) {

            const data = reactive({
                provinceValue: '',
                cityValue: '',
                areaValue: '',
                streetValue: '',
                provinceData: [],
                cityData: [],
                areaData: [],
                streetData: []
            });


            /**
             * 获取省份
             */
            const getProvince = (() => {
                let requestData = {
                    type: "province"
                };
                GetCityPicker(requestData).then((response) => {
                    data.provinceData = response.data.data.data;
                }).catch();
            });

            /**
             * 选择省份后，获取城市
             */
            const handleProvince = ((value) => {
                data.cityValue = '';
                data.cityData=[];
                data.areaValue = '';
                data.areaData=[];
                data.streetValue = '';
                data.streetData=[];
                let requestData = {
                    type: "city",
                    province_code: value
                };
                GetCityPicker(requestData).then((response) => {
                    data.cityData = response.data.data.data;
                }).catch();

            });

            /**
             * 选择城市后，获取区
             */
            const handleCity = ((value) => {
                data.areaValue = '';
                data.areaData=[];
                data.streetValue = '';
                data.streetData=[];
                let requestData = {
                    type: "area",
                    city_code: value
                };
                GetCityPicker(requestData).then((response) => {
                    data.areaData = response.data.data.data;
                }).catch();
            });

            /**
             * 选择区后，获取街道
             */
            const handleArea = ((value) => {
                data.streetValue = '';
                data.streetData=[];
                let requestData = {
                    type: "street",
                    area_code: value
                };
                GetCityPicker(requestData).then((response) => {
                    data.streetData = response.data.data.data;
                }).catch();
            });

            const resetCity = (() => {
                data.provinceValue = '';
                data.cityValue = '';
                data.areaValue = '';
                data.streetValue = '';
            });

            getProvince();

            return {
                //数据
                data,
                //函数。方法
                getProvince,
                handleProvince,
                handleCity,
                handleArea,
                resetCity
            }
        }
    }
</script>

<style scoped>

</style>
