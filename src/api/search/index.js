import config from "../../assets/js/conf/config";
import { request } from "../../assets/js/utils/request";

export function gethotData(data) {
    return request(config.baseApi + "home/public/hotwords?token=" + config.token, "post", data)
}