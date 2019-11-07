import React, {Component} from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import { Menu, Icon, Button } from 'antd';
import {Link} from 'react-router-dom';
import menuList from '../../config/menuConfig';
/**
 * Left side navigation component
 */
// /<img src={logo} alt="logo"/>

const SubMenu = Menu.SubMenu;
export default class LeftNav extends Component{

    /**
     According to menu data array automatically produce tag array
     */
    getMenuNodes = (menuList) =>{
        return menuList.map(item =>{
            /**
             item was like:
             {
                title: 'home', 
                key: '/home',  //path
                icon: 'home', 
                childern: [], // can be empty or not
            }, 
             */
            if (!item.children){
                return (
                    <Menu.Item key= {item.key}>
                        <Link to = {item.key}>
                            <Icon type= {item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                return(
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )

            }
            
        })
    }

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
                    {/*
                    <Menu.Item key="home">
                        <Link to = '/home'>
                            <Icon type="pie-chart" />
                            <span>Home Page</span>
                        </Link>
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
                        <Menu.Item key="category">
                            <Link to = "category">
                                <Icon type="mail" />
                                <span>Category Manage</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="product">
                            <Link to = "product">
                                <Icon type="mail" />
                                <span>Product Manage</span>
                            </Link>
                        </Menu.Item>
                        
                    </SubMenu>

                    <Menu.Item key="user">
                        <Link to = '/user'>
                            <Icon type="pie-chart" />
                            <span>User Management</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="role">
                        <Link to = '/role'>
                            <Icon type="pie-chart" />
                            <span>Role Management</span>
                        </Link>
                    </Menu.Item>

                    */}

                    {
                        this.getMenuNodes(menuList)
                    }
                
            </Menu>

            </div>
        )
    }
}