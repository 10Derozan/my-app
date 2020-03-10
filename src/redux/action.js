//actionCreator(异步和同步)
import {reqLogin,reqRegister,reqUpdateUser,reqUser,reqUserList,reqChatMsgList,reqReadMsg} from '../api'
import io from 'socket.io-client'
import{
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USERLIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST
}from './actionType'


const auth_success = (user)=>({type:AUTH_SUCCESS,data:user})//授权成功的同步action
const error_msg = (msg)=>({type:ERROR_MSG,data:msg})//错误提示信息的同步action
const receive_user = (user)=>({type:RECEIVE_USER,data:user})//获取用户信息
export const reset_user = (msg)=>({type:RESET_USER,data:msg})//重置用户
const receive_user_list =(userList)=>({type:RECEIVE_USERLIST,data:userList})//获取用户列表
const receive_msg_list = ({users,chatMsgs})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs}})//获取消息列表
const receive_msg = (chatMsg)=>({type:RECEIVE_MSG,data:chatMsg})

function initIO(dispatch,userID){
    if(!io.socket){
        io.socket = io('ws://localhost:4000')
    }
    io.socket.on('receiveMsg',function(chatMsg){
        if(userID===chatMsg.from||userID===chatMsg.to){
            dispatch(receive_msg(chatMsg))
        }    
    })
}

//异步获取消息列表数据
async function getMsgList(dispatch,userID){
    initIO(dispatch,userID)
    const res  =await reqChatMsgList()
    const result = res.data
    if(result.code===0){
        const {users,chatMsgs}=result.data
        dispatch(receive_msg_list({users,chatMsgs}))
    }
}

//异步注册action
export const register = (user)=>{
    const {username,password,password2,userType}=user
    //前台表单验证，如果不通过返回一个error_msg的同步action
    if(password!=password2){
        return error_msg('两次密码不一致')
    }
    if(!username){
        return error_msg('用户名不能为空')
    }
    return async (dispatch) =>{
        //发送注册的异步ajax请求
        // const promise = reqRegister(user)
        // promise.then(res=>{
        //     const result = res.data
        // })
        const res = await reqRegister({username,password,userType})
        const result = res.data //{code:0/1,data:user,msg:''}
        if(result.code===0){
            dispatch(auth_success(result.data))
        } else{
            dispatch(error_msg(result.msg))
        }
    }
}
//异步登录action
export const login = (user)=>{
    const{username,password}=user
    if(!username){
        return error_msg('用户名不能为空')
    }
    return async (dispatch) =>{
        const res = await reqLogin({username,password})
        const result = res.data
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(auth_success(result.data))
        } else{
            dispatch(error_msg(result.msg))
        }
    }
}
//更新用户数据异步action
export const updateUser = (user)=>{
    return async (dispatch)=>{
        const res = await reqUpdateUser(user)
        const result = res.data
        if(result.code==0){
            dispatch(receive_user(result.data))
        }else{
            dispatch(reset_user(result.msg))
        }
    }
}
//获得用户数据
export const getUser = (user)=>{
    return async (dispatch)=>{
        const res = await reqUser(user)
        const result = res.data
        if(result.code==0){
            getMsgList(dispatch,result.data._id)
            dispatch(receive_user(result.data))
        }else{
            dispatch(reset_user(result.msg))
        }
    }
}
//获取用户列表
export const  getUserList = (userType)=>{
    return async (dispatch)=>{
        const res = await reqUserList(userType)
        const result = res.data
        if(result.code==0){
            dispatch(receive_user_list(result.data))
        }
    }
}

//发送消息
export const sendMsg = ({from,to,content})=>{
    return (dispatch)=>{
        io.socket.emit('sendMsg',{from,to,content})
    }
}