//显示指定用户列表的UI组件
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {WhiteSpace,WingBlank,Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import LazyLoad from 'react-lazyload'
const Header = Card.Header
const Body = Card.Body


class UserList extends Component{
    static propTypes = {
        userList:PropTypes.object.isRequired,
        history:PropTypes.any
    }
    render(){
        const userList = this.props.userList.toJS()
        return(
            <WingBlank style={{marginBottom:50,marginTop:50}}>
                {
                    userList.map(user=>(
                        user.header?
                        <LazyLoad>
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                                <Header thumb={require(`../../assets/images/${user.header}.jpg`)} 
                                extra={user.username} />
                                <Body>
                                    <div>职位：{user.post} </div>
                                    {user.company?<div>公司：{user.company} </div>:null}
                                    {user.salary?<div>薪水：{user.salary} </div>:null}
                                    <div>描述：{user.info} </div>
                                </Body>
                            </Card>
                        </div>
                        </LazyLoad>
                        :null
                    ))
                }
            </WingBlank>
        )
    }
}
export default withRouter(UserList)