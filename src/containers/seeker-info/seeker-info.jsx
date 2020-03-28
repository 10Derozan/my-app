import React, { Component } from 'react'
import{connect} from 'react-redux'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

import HeadSelector from'../../components/header-selector/header-selector'
import {updateUser} from '../../redux/action'



class SeekerInfo extends Component {
    state={
        header:'',//头像名称
        post:'',//职位
        info:'',//简介
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
        const{header,userType}=this.props.user
        if(header){
            const path = userType==='boss'?'/boss':'/seeker'
            return <Redirect to={path}></Redirect>
        }
        return(
            <div>
                <NavBar>求职者信息完善</NavBar>
                <HeadSelector setHeader={this.setHeader}></HeadSelector>
                <InputItem onChange={val=>{this.handleChange('post',val)}}>求职岗位</InputItem>
                <TextareaItem title="个人介绍" rows={1} onChange={val=>{this.handleChange('info',val)}}></TextareaItem>
                <Button onClick={this.save}>保存</Button>
            </div>
        )
    }
}

SeekerInfo.propTypes = {
    user:PropTypes.object,
    updateUser:PropTypes.func
}

export default connect(
    state=>({user:state.user}),
    {updateUser}
)(SeekerInfo)