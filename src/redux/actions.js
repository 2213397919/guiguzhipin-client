import {reqRegister,reqLogin,reqUpdata} from '../api';
import {AUTH_SUCCESS,AUTH_ERROR} from  './action-type';
//定义同步的action creator
export const authSuccess = data =>({type:AUTH_SUCCESS,data});
export const authError = data =>({type:AUTH_ERROR,data});
//定义异步action creator,注册
export const register = ({username,password,rePassword,type})=>{
    //表单验证
    if (!username) {
        //变成同步action creator
        return authError({errMsg: '请输入用户名'});
    } else if (!password) {
        return authError({errMsg: '请输入密码'});
    } else if (password !== rePassword) {
        return authError({errMsg: '两次密码输入不一致'});
    }

    return dispatch =>{

        // 发送ajax请求
        reqRegister({username,password,type})
            .then(({data}) =>{
                if (data.code ===0){
                    //注册成功~
                    //更新状态, 分发成功的action对象
                    dispatch(authSuccess(data.data));
                }else{
                //    注册失败
                    dispatch(authError({errMsg:data.msg}));
                }
        })
            .catch(err =>{
                // //请求失败~
                dispatch(authError({errMsg: '网络不稳定，请刷新试试~'}));
                // console.log(err);
            })
    }
}
//定义异步action creator,登录
export const login = ({username,password})=>{
    //表单验证
    if (!username) {
        //变成同步action creator
        return authError({errMsg: '请输入用户名'});
    } else if (!password) {
        return authError({errMsg: '请输入密码'});
    }
    return dispatch =>{
        reqLogin({username,password})
            .then(({data})=>{
               if (data.code===0){
                   //登录成功~
                   //更新状态, 分发成功的action对象
                   dispatch(authSuccess(data.data));
               }else {
                   //    注册失败
                   dispatch(authError({errMsg:data.msg}));
               }
        })
            .catch(err=>{
                dispatch(authError({errMsg: '网络错误，请刷新试试~'}));
            })
    }
}
export const upData = ({header,post,company,salary,info,type})=> {
//    表单验证
    if (!header) {
        return authError({errMsg: '请选择头像'})
    } else if (!post) {
        return authError({errMsg: type === 'boss' ? '请填写招聘职位' : '请填写求职岗位'})
    } else if (!company  && !company) {
        return authError({errMsg: '请选择公司'})
    } else if (!salary  && !salary) {
        return authError({errMsg: '请选择期望薪资'})
    } else if (!info) {
        return authError({errMsg: type === 'boss' ? '请填写职位要求' : '请填写个人简介'})
    }
    return dispatch => {
        reqUpdata({header, post, company, salary, info})
            .then(({data})=>{
                if (data){
                    if (data.code === 0) {
                        dispatch(authSuccess(data.data));
                    } else {
                        dispatch(authError({errMsg: data.msg}));
                    }
                }
            })
            .catch(err => {
                dispatch(authError({errMsg: '网络错误，请刷新试试~'}));
            })
    }
}
