import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {InputItem, NavBar, List,Icon} from 'antd-mobile'
import {sendMsg} from '../../redux/action'
import {reqChatMsgList} from '../../api/index'
import '../../assets/index.scss'

const Item = List.Item
class Chat extends Component{
    state={
        content:''
    }
    componentDidMount(){
        reqChatMsgList()
        window.scrollTo(0,document.body.scrollHeight)
    }
    componentDidUpdate(){
        window.scrollTo(0,document.body.scrollHeight)
    }
    handleSend=()=>{
        const from = this.props.user._id
        const to = this.props.match.params.userID
        const content = this.state.content.trim()
        if(content){
            this.props.sendMsg({from,to,content})
            this.setState({content:''})
        }
    }
    render(){
        const {user,chat} =this.props
        const users = chat.get('users'),chatMsgs = chat.get('chatMsgs')
        //const {users,chatMsgs} = this.props.chat
        const myID = user.get('_id')
        if(!users.get(myID))return null
        const targetID = this.props.match.params.userID
        const chatID = [myID,targetID].sort().join('_')
        const msgs = chatMsgs.filter(msg=>msg.get('chat_id')===chatID)
        const targetHeader = users.get(targetID).get('header')
        const targetIcon = require(`../../assets/images/${targetHeader}.jpg`)
        return(
            <>
                <NavBar icon={<Icon type='left' ></Icon>} 
                className='sticky-header'
                onLeftClick={()=>this.props.history.goBack()} 
                >
                {users.get(targetID).get('username')}
                </NavBar>
                <List style={{marginBottom:50,marginTop:50}}>
                    {msgs.map(msg=>{
                        if(myID===msg.get('to')){
                            return<Item key={msg.get('_id')} 
                            thumb={targetIcon}>{msg.get('content')}
                            </Item>
                        }else{
                            return<Item key={msg.get('_id')} extra={'我'}
                             className='chat-me'>{msg.get('content')}
                             </Item>
                        }
                    })}
                </List>
                <div className='am-tab-bar'>
                    <InputItem placeholder="请输入"
                    value={this.state.content}
                    onChange={val=>this.setState({content:val})}
                    extra={<span onClick={this.handleSend}>发送</span>}>
                    </InputItem>
                </div>
            </>
        )
    }
}
Chat.propTypes = {
    user:PropTypes.object,
    history:PropTypes.any,
    match:PropTypes.any,
    sendMsg:PropTypes.func,
    chat:PropTypes.object
}


export default connect(
    state=>({user:state.get('user'),chat:state.get('chat')}),
    {sendMsg}
)(Chat)