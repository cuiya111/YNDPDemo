import axios from "axios";

export const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000
});

// 请求拦截器
request.interceptors.request.use(function(req){
    req.headers["Content-Type"] = "application/json";
    return req;
});
// 响应拦截器
request.interceptors.response.use(function(res){
    return res.data;
},function(error){
    const status = error.response.status;
    switch(status){
        case 404: {
            console.log("请求的资源不存在");
            break;
        }
        default: {
            console.log("请求出错，请检查网络连接");
        }
    }
    return Promise.reject(error);
});