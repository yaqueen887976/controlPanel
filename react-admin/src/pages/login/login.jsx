import React, {Component} from 'react';
import './login.less';
import logo from './images/logo.png';
import { Form, Icon, Input, Button } from 'antd';
import {reqLogin} from '../../api/index';
import {message} from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {Redirect} from 'react-router-dom';


//login router component

const Item = Form.Item; //cannot before import
class Login extends Component{
    handleSubmit = (event) => {
        //prevent event default action
        event.preventDefault();
        //validte all forms
        this.props.form.validateFields(async (err,values) => {
            //if success
            if (!err){
                //console.log('submit login ajax request ',values);
                const {username, password} = values;
                const result = await reqLogin(username, password);
                //console.log('request success',response.data);
                //const result = response.data; // {status:0, data: user} {status:1, msg: 'xxx'}
                if( result.status === 0){ //login success
                    message.success('login success');

                    //save users
                    const user = result.data;
                    memoryUtils.user = user; // store in memory
                    storageUtils.saveUser(user); //save to local
                    //go to admin page
                    this.props.history.replace('/');
                }else{ //login fails
                    message.error(result.msg);
                }
            }else{
                console.log('validation fails');
            }
        });
        //get form object
        //const form = this.props.form;
        //const values = form.getFieldsValue();
        //console.log(values);
    }     

    /**
     self validation for password
     */
    validatePwd = (rule, value, callback) =>{
        
                            
        /* username / password validation
         1). required
         2). at least or equal 4
         3). at most  or equal 12
         4). letters, numbers or underscore */ 
        
        console.log('validatePwd',rule,value)
        if(!value){
            callback('password is required')
        }else if(value.length < 4){
            callback('password length should greater than 4')
        }else if(value.length > 12){
            callback('password length should less than 12')
        }else if (!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('password should be letters, numbers or underscore')
        }else{
            callback()
        }
        //callback() //pass
        //callback('XXX') //fail, show hint message
    }
    render(){
        //if user is already logged in, jump to admin automatically
        const user = memoryUtils.user;
        if(user._id){
            return <Redirect to = '/'/>
        }
        const form = this.props.form;
        const {getFieldDecorator} = form;
        return(
            <div className = "login">
                <header className = "login-header">
                    <img src={logo} alt="logo"/>
                   <h1>React: Backend Management System</h1>
                </header>
                <section className = "login-content">
                    <h2>User Login</h2> 
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {/**
                            声明式验证: 直接用别人定义好的验证
                            /* username / password validation
                            1). required
                            2). at least 4
                            3). at most 12
                            4). letters, numbers or underscore */  }
                            {getFieldDecorator('username',{ //configuration object: if property name is 
                                rules: [
                                    {required:true, whitespace: true, message: 'Please input your username!'},
                                    {min: 4, message: 'minimum username length is at least 4'},
                                    {max: 12, message: 'maximum username length is at least 12'},
                                    {pattern: /^[a-zA-Z0-9_]+$/, message: 'username should be letters, numbers or underscore'},
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username" 
                                />
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password',{
                                rules:[
                                    {
                                        validator: this.validatePwd
                                    }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='password'
                                    placeholder="Password" 
                                />
                            )}
                            
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div> 
        )
    }
}


const WrapLogin = Form.create()(Login)
export default WrapLogin
//frontend form validation

