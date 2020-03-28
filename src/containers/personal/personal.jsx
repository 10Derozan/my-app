import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {reset_user} from '../../redux/action'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component{
    logout = ()=>{
        Modal.alert('退出','确定推出登录吗？',[
            {text:'取消'},
            {
                text:'确定',
                onPress:()=>{
                    Cookies.remove('userID')
                    this.props.reset_user()
                }
            }
        ])
    }
    render(){
        //const {username,header,company,post,salary,info} = this.props.user
        const {user} = this.props
        const username = user.get('username')
        const header = user.get('header')
        const company = user.get('company')
        const post = user.get('post')
        const salary = user.get('salary')
        const info = user.get('info')
        return(
            <div>
                <Result img={<img src={require(`../../assets/images/${header}.jpg`)} style={{width:50}} alt="header"/>}
                title={username}
                message={company} />
                <List renderHeader={()=>'相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{post} </Brief>
                        <Brief>简介：{info} </Brief>
                        {salary? <Brief>薪资：{salary} </Brief>:null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}
Personal.propTypes = {
    reset_user:PropTypes.func,
    user:PropTypes.object
}

export default connect(
    state => ({user:state.get('user')}),
    {reset_user}
)(Personal)