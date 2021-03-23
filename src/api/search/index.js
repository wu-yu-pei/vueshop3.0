import config from "../../assets/js/conf/config";
import { request } from "../../assets/js/utils/request";
// 热门搜索数据
export function gethotData(data) {
    return request(config.baseApi + "home/public/hotwords?token=" + config.token, "post", data)
}
//搜索数据
export function getSearchData(data) {
    let keyword = data.keyword
    let url = config.baseApi + 'home/goods/search?kwords=' + keyword + '&param=&page=1&price1=&price2=&otype=all&cid=&token=' + config.token
    console.log(url);
    return request(url)
}