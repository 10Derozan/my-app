import React, { Component } from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/action'
import PropTypes from 'prop-types'

class Seeker extends Component{
    componentDidMount(){
        this.props.getUserList('boss')
    }
    render(){
        return(
            <UserList userList={this.props.userList}></UserList>
        )
    }
}
Seeker.propTypes ={
    getUserList:PropTypes.func,
    userList:PropTypes.any
}

export default connect(
    state=>({userList:state.get('userList')}),
    {getUserList}
)(Seeker)