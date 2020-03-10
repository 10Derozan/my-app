//工具函数

export function getRedirectTo(header,userType){
    let path;
    if(userType==='boss'){
        path = './boss'
    }else{
        path = './seeker'
    }
    if(!header){
        path+='info'
    }
    return path
}
