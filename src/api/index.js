//包含了n个接口请求的函数的模块,函数返回值为：promise
import ajax from './ajax'
export const reqRegister = (user)=>ajax('/register',user,'POST')

export const reqLogin = (user)=>ajax('/login',user,'POST')

export const reqUpdateUser = (user)=>ajax('/update',user,'POST')

export const reqUser = (user)=>ajax('/user')

export const reqUserList = (userType)=>ajax('/userlist',{userType})

export const reqChatMsgList = ()=>ajax('/msglist')

export const reqReadMsg = (from)=>ajax('/readmsg',from,'POST')
