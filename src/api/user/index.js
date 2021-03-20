import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/utils/request";

//会员登录
export function loginData(data) {
    return request(config.baseApi+"/home/user/pwdlogin?token="+config.token,"post",data)
}

//会员安全认证
export function safeUserData(data) {
    return request(config.baseApi+"/home/user/safe?token="+config.token, "post",data)
}

//安全退出
export function safeOutLoginData(data) {
    return request(config.baseApi+"/home/user/safeout?token="+config.token, "post",data)
}