import React, {Component} from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import { Menu, Icon, Button } from 'antd';
import {Link} from 'react-router-dom'
/**
 * Left side navigation component
 */
// /<img src={logo} alt="logo"/>

const SubMenu = Menu.SubMenu;
export default class LeftNav extends Component{
    render(){
        return(
            <div>
                <div className = "left-nav">
                    <Link to = '/'  className="left-nav-header">
                        
                        <h1>Backend</h1>
                    </Link>
                </div>

                <Menu
                    
                    mode="inline"
                    theme="dark"
                    
                    >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Home Page</span>
                    </Menu.Item>
                    
                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>Products</span>
                        </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Icon type="mail" />
                            <span>Category Manage</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="mail" />
                            <span>Product Manage</span>
                        </Menu.Item>
                        
                    </SubMenu>
                
            </Menu>

            </div>
        )
    }
}