import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/action'


class Boss extends Component{
    componentDidMount(){
        this.props.getUserList('seeker')
    }
    render(){
        return(
            <UserList userList={this.props.userList}></UserList>
        )
    }
}
Boss.propTypes = {
    getUserList:PropTypes.func,
    userList:PropTypes.any
}

export default connect(
    state=>({userList:state.get('userList')}),
    {getUserList}
)(Boss)