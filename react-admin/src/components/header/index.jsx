import React, {Component} from 'react';
import './index.less';
/**
 * Left side navigation component
 */
export default class Header extends Component{
    render(){
        return(
            <div className = "header">
                <div className = "header-top">
                    <span>Welcome, admin</span>
                    <a href = "javascript:">Logout</a>
                </div>
                <div className = "header-buttom">
                    <div className = "header-buttom-left">Home</div>
                    <div className = "header-buttom-right">
                        <span>2019-11-9 10:36</span>
                        <img src = "http://api.map.baidu.com/images/weather/day/qing.png" alt = "weather"></img>
                        <span>Sunny</span>
                    </div>
                </div>
            </div>
        )
    }
}