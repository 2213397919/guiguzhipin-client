import {combineReducers} from 'redux';
import Cookies from 'js-cookie';
import {
    AUTH_SUCCESS,
    AUTH_ERROR,
    UPDATE_USER_INFO,
    RESET_USER_INFO,
    UPDATE_USER_LIST,
    RESET_USER_LIST,
    RESET_CHAT_MESSAGES,
    GET_CHAT_MESSAGES,
    UPDATE_CHAT_MESSAGES,
    UPDATE_UNREADCOUNT,
} from './action-type';

//初始化状态的值
const initUserState = {
    username: '',
    type: '',
    _id: '',
    errMsg: '',
    redirectTo: '',
    header: '',
    post: '',
    salary: '',
    info: '',
    company: ''
};

function user(previousState = initUserState, action) {
    switch (action.type) {
        case AUTH_SUCCESS :
            return {...action.data, redirectTo: getRedirectPath(action.data.type, action.data.header)};
        case AUTH_ERROR :
            return {...initUserState, ...action.data};
        case UPDATE_USER_INFO :
            return {...action.data, redirectTo: getRedirectPath(action.data.type, action.data.header)};
        case RESET_USER_INFO :
            return {...initUserState, ...action.data}
        default :
            return previousState;
    }
}

const initUserListState = [];
function userList(previousState = initUserListState, action) {
    switch (action.type) {
        case UPDATE_USER_LIST :
            return action.data;
        case RESET_USER_LIST :
            return [];
        default :
            return previousState;
    }
}

const initChatMessagesState = {
    users: {},
    chatMsgs: [],
    unReadCount:0
}
function chatMessages(previousState = initChatMessagesState, action) {
    switch (action.type) {
        case GET_CHAT_MESSAGES :
            var userid = Cookies.get("userid");
            return {
                ...action.data,
                unReadCount: action.data.chatMsgs.reduce((pres,curr)=>{
                  return pres +(!curr.read && curr.to ===userid?1:0);
                },0)
            }
        case RESET_CHAT_MESSAGES :
            return initChatMessagesState;
        case UPDATE_CHAT_MESSAGES :
            return {
                users: previousState.users,
                chatMsgs: [...previousState.chatMsgs, action.data]
            };
        case UPDATE_UNREADCOUNT:
            var userId = Cookies.get("userid");
            console.log(action.data)
            return {

                chatMsgs:previousState.chatMsgs.map(chatMsgs=>{
                    if (chatMsgs.from === action.data.from && chatMsgs.to === userId && !chatMsgs.read){
                        return {...chatMsgs,read:true}
                    }else {
                        return chatMsgs;
                    }
                }),
                users:previousState.users,
                unReadCount:previousState.unReadCount - action.data
            }
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
// {xxx: function xxx() {}, yyy: function yyy() {}}
export default combineReducers({
    user,
    userList,
    chatMessages
})