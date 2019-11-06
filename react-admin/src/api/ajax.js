<<<<<<< HEAD
/*
A module that can send ajax request
return promise object
*/
import axios from 'axios';
import {message} from 'antd';

export default function ajax(url, data = {}, type = 'GET'){
    return new Promise((resolve, reject) =>{
        let promise;
        if (type === 'GET'){
            promise =  axios.get(url,{ //config object
                params: data
            });
        }else{
            promise = axios.post(url,data);
        }
        //if success
        promise.then(response =>{
            resolve(response.data);
        }).catch(error =>{
            //reject(error)
            message.error('request error' + error.message);
        })
    })
    
}


//request login 
//ajax('login',{username: 'Tom', password: '12345'}, 'POST').then();
 
//add users
=======
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
>>>>>>> 0eab15da10fbf553a4e4a73ae30b5a312180efbc
//ajax('/manage/user/add', {username: 'Tom', password: '12345', phone:'13320003060'}, 'POST').then();