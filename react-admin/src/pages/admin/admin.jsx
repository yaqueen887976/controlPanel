import React, {Component} from 'react';
import memoryUtils from '../../utils/memoryUtils';
import {Redirect} from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

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
                        <Content style = {{backgroundColor: '#fff'}}>Content</Content>
                        <Footer style = {{textAlign: 'center', color: '#cccccc'}}>Recommand Chrome Browser, bet better experience</Footer>
                    </Layout>
            </Layout>
        )
    }
}