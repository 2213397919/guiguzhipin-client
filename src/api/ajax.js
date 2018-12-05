//此模块用于处理ajax请求
import axios from 'axios';

export default async function(url,data,method='GET') {
//    发送请求的参数
    let qs = '';
    if (data){
    //    将对象转换成数组
        const arr = Object.keys(data);
        //遍历，进行拼串
        arr.forEach(key =>{
            qs += `${key}=${data[key]}&`;
        })
    //    截取字符串
        qs = qs.substring(0,qs.length-1);
    }
//    发送ajax请求
    const type = method.toLocaleUpperCase();
    if (type === 'GET') {
        return axios.get(url+'?'+qs);
    }else if (type === 'POST'){
        return axios.post(url,qs,{
            'content-type': 'application/x-www-form-urlencoded'
        });
    }
}