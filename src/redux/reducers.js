/*
  作用：根据之前的状态（previousState）和更新数据的行为（action）产生一个新的状态（newState）
 */
import {combineReducers} from 'redux';
import {AUTH_SUCCESS,AUTH_ERROR } from  './action-type';

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
        default :
            return previousState;
    }
}
function getRedirectPath(type, header) {
    let path = '';

    if (type === 'boss') {
        path = '/boss';
    } else {
        path = '/dashen';
    }

    if (!header) {
        path += 'info';
    }

    return path;
}
//默认暴露合并后的reducers函数
export default combineReducers({
    user
})