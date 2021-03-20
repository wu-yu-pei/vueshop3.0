import axios from 'axios';
import qs from "qs";
export function request(config={}){
    let service=axios.create({
        baseURL:process.env.VUE_APP_API
    });
    //拦截器
    service.interceptors.request.use(function (config) {
        if (config.method==='post'){
            config.data = qs.stringify(config.data);
        }else if (config.method==='file'){
            config.method="post";
            if (config.data && config.data instanceof Object){
                let params=new FormData();
                for (let key in config.data){
                    params.append(key, config.data[key]);
                }
                config.data=params;
            }
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    //响应之后
    service.interceptors.response.use(function (response) {
        // console.log(response);
        if (response.config.url===response.config.baseURL+"/home/user/safe?token=1ec949a15fb709370f"){
            if (response.config.data.code!==200){
                // window.location.href = "http://www.lucklnk.com"
            }
        }
        return response;
    }, function (error) {
        return Promise.reject(error);
    });

    return service.request(config).then(res=>res.data)
}