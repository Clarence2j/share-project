import axios from 'axios'
import vue from 'vue'
import { baseUrl } from '@/config/env'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = baseUrl;

//请求拦截器
axios.interceptors.request.use(
    function(config) {
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

export function post(url , params = {}){
    let request = JSON.stringify(params);
    return new Promise((resolve , reject) => {
        //post请求
        axios({
            method : "post",
            url : `${baseUrl}/${url}`,
            data : params,
        }).then(response => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        })
    })
}
