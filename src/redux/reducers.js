/*
  作用：根据之前的状态（previousState）和更新数据的行为（action）产生一个新的状态（newState）
 */
import {combineReducers} from 'redux';
import {AUTH_SUCCESS,AUTH_ERROR,UPDATE_USER_INFO,RESET_USER_INFO,UPDATE_USER_LIST,RESET_USER_LIST } from  './action-type';

//初始化状态的值
const initState = {
    username: '',
    type: '',
    _id: '',
    errMsg: '',
    redirectTo:'',
    header:'',
    post:'',
    company:'',
    salary:'',
    info:''
}
function user(previousState = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data,redirectTo:getRedirectPath(action.data.type,action.data.header)};
        case AUTH_ERROR:
            return  {...initState,...action.data}
        case UPDATE_USER_INFO:
            return {...action.data,redirectTo:getRedirectPath(action.data.type,action.data.header)};
        case RESET_USER_INFO:
            return  {...initState,...action.data}
        default :
            return previousState;
    }
}

const  initUserListState = [];
function userList (previousState=initUserListState,action) {
    switch (action.type) {
        case UPDATE_USER_LIST:
            return action.data;
        case RESET_USER_LIST:
            return [];
        default :
            return previousState;
    }
}
//通过传入的type来判断，将跳转那个页面地址。
function getRedirectPath(type, header) {
    let path = '';

    if (type === 'boss') {
        path = '/boss';
    } else {
        path = '/dashen';
    }
    //如果没有header(头像)，则在跳转的路由后面加info，到信息完善页面。
    if (!header) {
        path += 'info';
    }
    return path;
}
//默认暴露合并后的reducers函数
export default combineReducers({
    user,
    userList
})