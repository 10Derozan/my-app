import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
}from 'antd-mobile'
import PropTypes from 'prop-types'
import{connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


import{register} from '../../redux/action'
import Logo from '../../components/logo/logo'

const ListItem = List.Item
class Register extends Component{
    state={
        username:'',
        password:'',
        password2:'',
        userType:'seeker',
        redirectTo:''
    }
    toLogin=()=>{
        this.props.history.push('./login')
    }
    handleChange=(name,val)=>{
       this.setState({[name]: val})
    }
    register=()=>{
       this.props.register(this.state)
    }
    render(){
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return<Redirect to={redirectTo}></Redirect>
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
                        <InputItem placeholder='请再次输入密码' type='password' onChange={val=>{this.handleChange('password2',val)}}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.userType==='seeker'} onChange={()=>this.handleChange('userType','seeker')}>求职者</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.userType==='boss'} onChange={()=>this.handleChange('userType','boss')}>老板</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button onClick={this.register}>注册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有帐户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
Register.propTypes = {
    register:PropTypes.func,
    user:PropTypes.object,
    history:PropTypes.any
}

export default connect(
    state=>({user:state.user}),
    {register}
)(Register)