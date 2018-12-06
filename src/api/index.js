//定义所有的请求函数
import ajax from './ajax';
//接口前缀
//正常请求的配置
// const prefix = 'http://localhost:4000';
//代理服务器需要的配置
const prefix = '';
//定义请求,注册
export const reqRegister = data => ajax(`${prefix}/register`,data,'POST');
//定义请求,登录
export const reqLogin = data => ajax(`${prefix}/login`,data,'POST');
//发送请求，将完善信息保存到数据库
export const reqUpdata= data => ajax(`${prefix}/update`,data,'POST');
//
export const reqGetUserInfo= data => ajax(`${prefix}/user`);