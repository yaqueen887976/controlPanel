/*
A module that can send ajax request
return promise object
*/

import axios from 'axios';
export default function ajax(url, data = {}, type = 'GET'){
    if (type === 'GET'){
        return axios.get(url,{ //config object
            params: data
        });
    }else{
        return axios.post(url,data);
    }
}

//request login 
//ajax('login',{username: 'Tom', password: '12345'}, 'POST').then();

//add users
//ajax('/manage/user/add', {username: 'Tom', password: '12345', phone:'13320003060'}, 'POST').then();