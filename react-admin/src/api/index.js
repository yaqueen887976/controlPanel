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