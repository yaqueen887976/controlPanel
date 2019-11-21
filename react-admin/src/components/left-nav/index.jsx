import React, {Component} from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import { Menu, Icon } from 'antd';
import {Link, withRouter} from 'react-router-dom';
import menuList from '../../config/menuConfig';
/**
 * Left side navigation component
 */
// /<img src={logo} alt="logo"/>

const SubMenu = Menu.SubMenu;
class LeftNav extends Component{

    /**
     According to menu data array automatically produce tag array
     use map() and recursion
     */
    getMenuNodes_map = (menuList) =>{
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

    /**
     According to menu data array automatically produce tag array
     use reduce() and recursion
     */
    getMenuNodes = (menuList)=>{
        const path = this.props.location.pathname;
        return menuList.reduce((pre,item) =>{
            //add <Menu.Item>/ <SubMenu> to pre
            if(!item.children){
                pre.push((
                    <Menu.Item key= {item.key}>
                        <Link to = {item.key}>
                            <Icon type= {item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else{
                //if have children
                //find a child item that can match current request path
                const cItem = item.children.find(cItem => cItem.key === path)

                if(cItem){
                    this.openKey = item.key;
                }
                //if cItem is true, means current item's subMenu should be open
                
                

                //add <SubMenu>
                pre.push(
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
            return pre; 
        },[])
    }

    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList);
    }
    render(){
        //const menuNodes = this.getMenuNodes(menuList);
        //debugger
        const path = this.props.location.pathname;
        const openKey = this.openKey;
        return(
            <div>
                <div className = "left-nav">
                    <Link to = '/'  className="left-nav-header">
                        <img src={logo} alt="logo"/>
                        <h1>Backend</h1>
                    </Link>
                </div>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys = {[path]}defaultOpenKeys
                    defaultOpenKeys = {[openKey]}
                >
                    

                    {
                        this.menuNodes
                    }
                
            </Menu>

            </div>
        )
    }
}

export default withRouter(LeftNav);