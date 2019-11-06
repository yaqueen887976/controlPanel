/**
 local data storage management tool
 */
import store from 'store';
const USER_KEY = 'user_key';
 export default{

     /**
      Save Users
      */
     saveUser(user){
         //localStorage.setItem(USER_KEY, JSON.stringify(user))
         store.set(USER_KEY,user);
     },
    
      /**
      Read Users
      */
     getUser(){
         //return JSON.parse(localStorage.getItem(USER_KEY) ||'{}')
         return store.get(USER_KEY) ||{};
     },

      /**
      Delete Users
      */

      removeUser(){
          //localStorage.removeItem(USER_KEY);
          store.remove(USER_KEY);
      }
 }