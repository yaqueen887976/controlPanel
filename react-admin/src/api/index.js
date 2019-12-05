
/**
 contains all request module
 every function return promise
 */
import jsonp from 'jsonp';
import ajax from './ajax';
import { message } from 'antd';

 const BASE = "";
 //login

 export const reqLogin = (username,password) => ajax(BASE+'/login', {username,password}, 'POST');

 //add user
 export const reqAddUser = (user) => ajax(BASE+'/manage/user/add', user, 'POST');

/*
json request
*/
export const reqWeather = (city) =>{
   return new Promise((resolve, reject) =>{
      const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&ou tput=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
      jsonp(url, {}, (err,data) =>{
         console.log('jsonp()',err, data);
         if(!err && data.status ==='success'){
            const {dayPictureUrl, weather} = data.results[0].weather_data[0];
            resolve(dayPictureUrl,weather);
         }else{
            message.error('failt to get weather information');
         }
      })
   })
   
}

//get primary, secondary category
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list',{parentId})

//add category
export const reqAddCategory = (categoryName,parentId) => ajax(BASE + '/manage/category/add',{categoryName, parentId},'POST')

export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(BASE + '/manage/category/update',{categoryId, categoryName},'POST')
//reqWeather("北京")

export const reqProducts = (pageNum,pageSize) => ajax(BASE + 'manage/product/list',{pageNum,pageSize})
