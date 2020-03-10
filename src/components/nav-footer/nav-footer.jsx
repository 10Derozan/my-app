import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import './nav-footer.scss'

const Item = TabBar.Item

class NavFooter extends Component{
    static propTypes = {
        navList:PropTypes.array.isRequired
    }
    render(){
        let navList = this.props.navList
        navList = navList.filter(nav=>!nav.hide)
        return(
            <TabBar>
                {
                    navList.map((nav)=>(
                        <Item key={nav.path} title={nav.text}
                        icon={{uri:require(`./icon/${nav.icon}.png`)}}
                        selectedIcon={{uri:require(`./icon/${nav.icon}-selected.png`)}}
                        selected={this.props.location.pathname===nav.path}
                        onPress={()=>this.props.history.replace(nav.path)}/>
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)