import React, { Component } from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'
import '../../assets/index.scss'


export default class HeadSelector extends Component{
    static propTypes = {
        setHeader:PropTypes.func.isRequired
    }
    
    constructor(props){
        super(props)
        this.headerList = []
        this.headerList.push({text:'1',icon:require(`../../assets/images/1.jpg`)})
        this.headerList.push({text:'2',icon:require(`../../assets/images/2.jpg`)})
    }

    state = {
        icon:null
    }
    handleClick = ({text,icon}) => {
        //更新当前组件状态
        this.setState({
            icon
        })
        //调用函数更新父组件状态
        this.props.setHeader(text)
    }
    
    render(){
        const listHeader  = !this.state.icon? '请选择头像' :(
            <div>
                <p>已选择头像</p>
                <img src={this.state.icon} className='header_img' alt='头像'></img>
            </div>
        )
        return(
            <List renderHeader={()=>listHeader}>
                <Grid data={this.headerList} onClick={this.handleClick}></Grid>
            </List>
        )
    }
}
