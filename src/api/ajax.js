//发送ajax请求，里面封装了axios，函数返回值是promise对象
import axios from 'axios'
export default function ajax(url,data={},method='GET'){
    if(method==='GET'){
        let paramStr = '';
        Object.keys(data).forEach(key=>{
            paramStr+=key+'='+data[key]+'&';
        })
        if(paramStr){
            paramStr = paramStr.substring(0,paramStr.length-1);
        }
        return axios.get(url+'?'+paramStr)
    }else{
        return axios.post(url,data)
    }
}

