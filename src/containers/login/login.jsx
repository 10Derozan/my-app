import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
}from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


import {login} from '../../redux/action'
import Logo from '../../components/logo/logo'


class Login extends Component{
    state={
        username:'',
        password:'',
        redirectTo:''
    }
    toRegister=()=>{
        this.props.history.push('./register')
    }
    handleChange=(name,val)=>{
       this.setState({[name]: val})
    }
    login=()=>{
        this.props.login(this.state)
    }
    render(){
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo></Logo>
                <WhiteSpace/>
                <WingBlank>
                {msg? <div className='error-msg'>{msg}</div> :null}
                    <List>
                        <InputItem placeholder='请输入用户名' onChange={val=>{this.handleChange('username',val)}}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={val=>{this.handleChange('password',val)}}>密 码:</InputItem>
                        <WhiteSpace/>
                        <Button onClick={this.login}>登录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>没有帐户，去注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(Login)