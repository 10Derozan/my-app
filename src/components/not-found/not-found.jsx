import{Button} from 'antd-mobile'
import React, { Component } from 'react'
export default class Notfound extends Component {
    render(){
        return(
        <div>
            <h2>抱歉，找不到该页面！</h2>
            <Button type='primary' onClick={()=>this.PaymentResponse.history.replace("/")}>
                回到首页
            </Button>
        </div>
        )
    }
}
