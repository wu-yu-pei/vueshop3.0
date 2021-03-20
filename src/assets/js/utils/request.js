import axios from 'axios';
export function request(url,method="get",data={},config={}){
    return axiosRequest(url, method,data, config)
}

function axiosRequest(url,method,data,config) {

    if (method.toLowerCase()==='post'){
        if (data instanceof Object){
            let params=new URLSearchParams();
            for (let key in data){
                params.append(key, data[key]);
            }
            data = params;
        }
    }else if (method.toLowerCase()==='file'){
        method="post";
        if (data instanceof Object){
            let params=new FormData();
            for (let key in data){
                params.append(key, data[key]);
            }
            data = params;
        }
    }
    let axiosConfig={
        url:url,
        method:method.toLowerCase(),
        data:data
    };
    if (config instanceof Object){
        for (let key in config){
            axiosConfig[key]=config[key];
        }
    }
    return axios(axiosConfig).then(res=>res.data);
}