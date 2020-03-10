import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import BossInfo from '../boss-info/boss-info'
import SeekerInfo  from '../seeker-info/seeker-info'
import Boss from '../boss/boss'
import Seeker from '../seeker/seeker'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'

import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/action'


class Main extends Component{
    navList = [
        {
            path:'/boss',
            component:Boss,
            title:'求职者列表',
            icon:'list',
            text:'求职者'
        },
        {
            path:'/seeker',
            component:Seeker,
            title:'老板列表',
            icon:'list',
            text:'老板'
        },
        {
            path:'/message',
            component:Message,
            title:'消息列表',
            icon:'message',
            text:'消息'
        },
        {
            path:'/personal',
            component:Personal,
            title:'个人中心',
            icon:'personal',
            text:'个人'
        }
    ]
    componentDidMount(){
        //Cookie中有userID，但redux状态中没有_id
        const userID = Cookies.get('userID')
        const {_id} = this.props.user
        if(userID && !_id){
            this.props.getUser()
        }
    }

    render(){
        const userID = Cookies.get('userID')
        if(!userID){
            return<Redirect to='/login'></Redirect>
        }
        const {user} = this.props
        if(!user._id){
            return null
        }else{
            let path = this.props.location.pathname
            if(path==='/'){
                path = getRedirectTo(user.header,user.userType)
                return <Redirect to={path} />
            }
        }
        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav=>nav.path===path)
        if(currentNav){
            if(user.userType==='boss'){
                navList[1].hide = true
            }else navList[0].hide = true
        }
        return (
            <div>
                {currentNav? <NavBar className='sticky-header'>{currentNav.title}</NavBar>:null}
                <Switch>
                    {navList.map((nav,key) => <Route path={nav.path} component={nav.component} key={key}></Route>)}
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/seekerinfo' component={SeekerInfo}></Route>
                    <Route path='/notfound' component={NotFound}></Route>
                    <Route path='/chat/:userID' component={Chat}></Route>
                </Switch>
                {currentNav?<NavFooter navList={navList}/>:null}
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {getUser}
)(Main)

//1.实现自动登录，如果cookie中有userID，发请求获取对应的user
//2.如果已经登录，请求根路径则自动重定向用户主界面