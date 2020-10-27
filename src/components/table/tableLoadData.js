import {reactive} from "@vue/composition-api";
import RequestUrl from "../../api/requestUrl";
import {LoadTableData} from "../../api/common";

export function tableLoadData() {
    const tableData = reactive({
        item: []
    });

    const LoadingData = ((param) => {
        let requestUrl = param;
        let requestData = {
            url: RequestUrl[requestUrl.url],
            method: requestUrl.method,
            data: requestUrl.data,
        };
        LoadTableData(requestData).then((response) => {
            let responseData = response.data.data.data;
            if (responseData.length > 0 && responseData) {
                tableData.item = responseData;
            }
        }).catch((error) => {
        });
    });

    return {
        tableData, LoadingData
    }
}
