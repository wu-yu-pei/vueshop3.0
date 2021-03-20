import config from "../../assets/js/conf/config";
import { request } from "../../assets/js/utils/request";
// 获取分类页左侧数据
export function getClassifyData() {
    return request(config.baseApi + "home/category/menu?token=" + config.token);
}