import config from "../../assets/js/conf/config";
import { request } from "../../assets/js/utils/request";
// 首页快速导航数据
export function getNavsData() {
    return request(config.baseApi + "/home/index/nav?token=" + config.token);
}
// 首页Swiper数据
export function getSwiperData() {
    return request(config.baseApi + "home/index/slide?token=" + config.token)
}
// 首页GoodS数据
export function getGoodsData() {
    return request(config.baseApi + "home/index/goodsLevel?token=" + config.token)
}
//  首页为你推荐数据
export function gatRecomData() {
    return request(config.baseApi + "home/index/recom?token=" + config.token)
}