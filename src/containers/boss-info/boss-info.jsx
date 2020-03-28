import React, { Component } from 'react'
import{connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import PropTypes from 'prop-types'

import HeadSelector from'../../components/header-selector/header-selector'
import {updateUser} from '../../redux/action'

class BossInfo extends Component {
    state={
        header:'',//头像名称
        post:'',//职位
        info:'',//简介
        company:'',//公司名称
        salary:'',//工资
    }

    setHeader = (header)=>{
        this.setState({
            header
        })
    }

    handleChange = (name,val) =>{
        this.setState({
            [name]:val
        })
    }

    save=()=>{
        this.props.updateUser(this.state)
    }
    render(){
        const header =this.props.user.get('header')
        const userType = this.props.user.get('userType')
        if(header){
            const path = userType==='boss'?'/boss':'/seeker'
            return <Redirect to={path}></Redirect>
        }
        return(
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeadSelector setHeader={this.setHeader}></HeadSelector>
                <InputItem onChange={val=>{this.handleChange('post',val)}}>招聘职位：</InputItem>
                <InputItem onChange={val=>{this.handleChange('company',val)}}>公司名称</InputItem>
                <InputItem onChange={val=>{this.handleChange('salary',val)}}>职位薪资</InputItem>
                <TextareaItem title="职位介绍" rows={3} onChange={val=>{this.handleChange('info',val)}}></TextareaItem>
                <Button onClick={this.save}>保存</Button>
            </div>
        )
    }
}
BossInfo.propTypes ={
    updateUser:PropTypes.func,
    header:PropTypes.string,
    userType:PropTypes.string,
    user:PropTypes.object
}


export default connect(
    state=>({user:state.get('user')}),
    {updateUser}
)(BossInfo)