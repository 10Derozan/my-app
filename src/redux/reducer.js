import {combineReducers} from 'redux'
import {ERROR_MSG,AUTH_SUCCESS,RECEIVE_USER,RESET_USER,RECEIVE_USERLIST,
        RECEIVE_MSG,RECEIVE_MSG_LIST} from './actionType'

import {getRedirectTo} from '../utils'
const initUser = {
    username:'',//用户名
    userType:'',//用户类型
    msg:'',//错误提示信息
    redirectTo:''//需要自动重定向的路由路径
}
function user(state=initUser,action){
    switch(action.type){
        case AUTH_SUCCESS://data是user
            const {header,userType} = action.data;
            return {
                ...action.data,  
                redirectTo:getRedirectTo(header,userType)   
            }
        case ERROR_MSG://data是msg
            return {
                ...state,
                msg:action.data
            }
        case RECEIVE_USER://data是user
            return  action.data //state中加入其他个人信息的数据
        case RESET_USER://data是msg
            return {
                ...initUser,
                msg:action.data,
            }
        default:
            return state
    }
}
//产生userlist状态的reducer
const initUserList = []
function userList(state=initUserList,action){
    switch(action.type){
        case RECEIVE_USERLIST://data为userlist
            return action.data
        default:
            return state
    }
}
//产生聊天状态的reducer
const initChat = {
    users:{},//所有用户信息 属性名：userID 属性值：{username,header}
    chatMsgs:[],//当前用户所有相关Msg
    unReadCount:0//未读消息数
}
function chat(state = initChat,action){
    switch(action.type){
        case RECEIVE_MSG_LIST:
            const {users,chatMsgs} = action.data
            return {
                users,
                chatMsgs,
                unReadCount:0
            }
        case RECEIVE_MSG:
            const chatMsg = action.data
            return{
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount:0
            }
        default:
            return state         
    }
}

const reducer = combineReducers({
    user,
    userList,
    chat
}
)

export default reducer