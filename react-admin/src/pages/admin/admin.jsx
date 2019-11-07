import React, {Component} from 'react';

import memoryUtils from '../../utils/memoryUtils';
import {Redirect, Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Line from '../chars/line';
import Bar from '../chars/bar';
import Pie from '../chars/pie';
const {  Footer, Sider, Content } = Layout;
/*
admin router components
*/

export default class Admin extends Component{
    render(){
        const user = memoryUtils.user;

        //if no user in local memory, means didn't login
        if(!user || !user._id){
            //jump to login page
            return <Redirect to = '/login'/>
        }
        return(
            <Layout style = {{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style = {{backgroundColor: '#fff'}}>
                            <Switch>
                                <Route path='/home' component={Home}/> 
                                <Route path='/category' component={Category}/> 
                                <Route path='/product' component={Product}/> 
                                <Route path='/role' component={Role}/> 
                                <Route path='/user' component={User}/> 
                                <Route path='/charts/bar' component={Bar}/> 
                                <Route path='/charts/line' component={Line}/> 
                                <Route path='/charts/pie' component={Pie}/> 
                                <Redirect to='/home' /> 
                            </Switch>
                        </Content>
                        <Footer style = {{textAlign: 'center', color: '#cccccc'}}>Recommand Chrome Browser, bet better experience</Footer>
                    </Layout>
            </Layout>
        )
    }
}