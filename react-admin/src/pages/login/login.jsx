import React, {Component} from 'react'
import './login.less'
import logo from './images/logo.png'
import { Form, Icon, Input, Button } from 'antd';
//login router component

const Item = Form.Item; //cannot before import
class Login extends Component{
    handleSubmit = (event) => {
        //prevent event default action
        event.preventDefault();
        //get form object
        const form = this.props.form;
        const values = form.getFieldsValue();
        console.log(values);
    }
    render(){
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
                            {/*<Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username" 
                            />*/}
                            {getFieldDecorator('username',{})(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username" 
                                />
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password',{})(
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

