import {reqRegister,reqLogin,reqUpdata,reqGetUserInfo,reqGetUserList,reqGetChartList,reqUpdateUnReadCount} from '../api';
//客户端使用socket.io发送与接收消息。
import io from 'socket.io-client';
import {AUTH_SUCCESS,AUTH_ERROR,UPDATE_USER_INFO,RESET_USER_INFO,
    UPDATE_USER_LIST,RESET_USER_LIST,RESET_CHAT_MESSAGES,GET_CHAT_MESSAGES,
    UPDATE_CHAT_MESSAGES,UPDATE_UNREADCOUNT,RESET_UNREADCOUNT} from  './action-type';
//定义同步的action creator
export const authSuccess = data =>({type:AUTH_SUCCESS,data});
export const authError = data =>({type:AUTH_ERROR,data});

export const updateUserInfo = data => ({type: UPDATE_USER_INFO, data});
export const resetUserInfo = data => ({type: RESET_USER_INFO, data});

export const updateUserList = data => ({type: UPDATE_USER_LIST, data});
export const resetUserList = () => ({type: RESET_USER_LIST});

export const getChatMessages = data => ({type: GET_CHAT_MESSAGES, data});
export const resetChatMessages = () => ({type: RESET_CHAT_MESSAGES});
export const updateChatMessages = data=> ({type: UPDATE_CHAT_MESSAGES,data})

export const updateCount = from => ({type: UPDATE_UNREADCOUNT,data:from});
export const resetCount = msg=> ({type: RESET_UNREADCOUNT,data:msg})

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
        return authError({errMsgL: '请输入用户名'});
    } else if (!password) {
        return authError({errMsgL: '请输入密码'});
    }
    //通过thunk实现了异步编程。
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
    } else if (type === 'boss' && !company) {
        return authError({errMsg: '请选择公司'})
    } else if (type === 'boss' && !salary) {
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
//得到用户的信息。
export const getUserInfo = ()=>{
    return dispatch =>{
        reqGetUserInfo()
            .then(({data})=>{
                if (data.code === 0){
                //    说明成功
                    dispatch(updateUserInfo(data.data));
                }else {
                    dispatch(resetUserInfo({errMsg:'网络不稳定，请刷新试试。'}))
                }
                }
            )
            .catch(err=>{
                dispatch(resetUserInfo({errMsg:'网络不稳定，请刷新试试。'}))
            })
    }
}
//获取大神信息。
export const getUserList = type=>{
    return dispatch =>{
        reqGetUserList(type)
            .then(({data})=>{
                    if (data.code === 0){
                        //    说明成功
                        dispatch(updateUserList(data.data));
                    }else {
                        dispatch(resetUserList())
                    }
                }
            )
            .catch(err=>{
                dispatch(resetUserList())
            })
    }
}
//保证和服务器的链接只连接一次
const socket = io('ws://localhost:5000');
export const sendMessage = ({message, from, to}) => {
    return dispatch => {
        //向服务器发送了一条消息
        console.log('浏览器端向服务器发送消息:', {message, from, to})
        socket.emit('sendMsg', {message, from, to})
        console.log('浏览器端向服务器发送消息:', {message, from, to})
        //    保证只绑定一次
        if (!socket.isFirst){
            socket.isFirst=true;
            //保证只绑定一次
            socket.on('receiveMsg', function (data) {
                console.log('浏览器端接收到服务器发送的消息:', data)
                dispatch(updateChatMessages(data))
            })

        }
    }
}
export const getChatList = ()=>{
    return dispatch =>{
        reqGetChartList()
            .then(({data})=>{
                if (data.code===0){
                    return dispatch(getChatMessages(data.data))
                } else {
                    return dispatch(resetChatMessages())
                }
            })
            .catch(err=>{
                return dispatch(resetChatMessages())
            })
    }
}
//更新未读消息数量
export const updateUnReadCount = from=>{
    return dispatch =>{
        reqUpdateUnReadCount(from)
            .then(res=>{
                console.log(res)
                const result = res.data;
                if (result.code===0){
                    console.log(result.data)
                    dispatch(updateCount({from,count:result.data}));
                }else {
                    console.log(1)
                    dispatch(resetCount({msg:result.msg}))
                }
                    })

    }
}
