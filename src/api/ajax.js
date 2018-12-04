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
        const result = await axios.get(url+'?'+qs);
        return result.data;
    }else if (type === 'POST'){
        const result = await axios.post(url,qs,{
            'content-type': 'application/x-www-form-urlencoded'
        });
        return result.data;
    }
}