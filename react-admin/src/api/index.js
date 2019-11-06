<<<<<<< HEAD
/**
 contains all request module
 every function return promise
 */

 import ajax from './ajax';

 const BASE = "";
 //login
 /*
 export function reqLogin(){
    return ajax('/login', {username,password}, 'POST')
 }*/
//login
 export const reqLogin = (username,password) => ajax(BASE+'/login', {username,password}, 'POST');

 //add user
 export const reqAddUser = (user) => ajax(BASE+'/manage/user/add', user, 'POST');
=======
/**
 contains all request module
 every function return promise
 */

 import ajax from '.ajax';
 //login
 /*
 export function reqLogin(){
    return ajax('/login', {username,password}, 'POST')
 }*/
//login
 export const reqLogin = (username,password) => ajax('/login', {username,password}, 'POST');

 //add user
 export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');
>>>>>>> 0eab15da10fbf553a4e4a73ae30b5a312180efbc
