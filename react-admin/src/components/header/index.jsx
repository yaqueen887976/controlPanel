import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Modal} from 'antd';

import LinkButton from '../link-button';
import './index.less';
import {reqWeather} from '../../api';
import {formateDate} from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';

/**
 * Left side navigation component
 */
class Header extends Component{
    

    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: ''
    }

    getTitle = () =>{
        const path = this.props.location.pathname;
        let title;

        menuList.forEach(item => {
            if(item.key ===path){
                title = item.title 
            } else if(item.children){
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title;
                }
            }
        })
        return title;
    }

    getTime = () =>{
        //every one seconds, update current time
        this.intervalId = setInterval(() =>{
            const currentTime = formateDate(Date.now());
            this.setState({currentTime})
        }, 1000)
    }

    getWeather = async() =>{
        const {dayPictureUrl, weather} = await reqWeather('北京')
        this.setState({dayPictureUrl, weather});
    }

    componentDidMount () {
        // get current time
        this.getTime()
        // get current weather
        this.getWeather()
      }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    logout =  () =>[
        //show a dialog box
        Modal.confirm({
            //title: 'Do you Want to delete these items?',
            content: 'Want to logout?',
            onOk : () =>{
              console.log('OK');
              //delete saved user info, jump to login
              storageUtils.removeUser();
              memoryUtils.user = {};
              this.props.history.replace('/login');
            },
            onCancel() {
              console.log('Cancel');
            },
          })
    ]
    render(){
        const {currentTime, dayPictureUrl, weather} = this.state;
        const username = memoryUtils.user.username;
        const title = this.getTitle();
        return(
            <div className = "header">
                <div className = "header-top">
                    <span>Welcome, {username}</span>
                    <LinkButton onClick = {this.logout}>Logout</LinkButton>
                </div>
                <div className = "header-buttom">
                    <div className = "header-buttom-left">{title}</div>
                    <div className = "header-buttom-right">
                        <span>{currentTime}</span>
                        {/*<img src = "http://api.map.baidu.com/images/weather/day/qing.png" alt = "weather"></img>*/}
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);