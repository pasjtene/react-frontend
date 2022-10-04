import axios from "axios";
import Cookies from 'js-cookie';
import AppService from "../services/AppService";
//import useAxios, { configure } from 'axios-hooks'
axios.defaults.withCredentials = true;
const API_SERVER = 'http://localhost:8085/api';

const instance = axios.create({
    withCredentials: true,
    baseURL: API_SERVER,
    })
    
   
const mylocation = window.location.origin;



class UserService {
    //axios.defaults.withCredentials = true
    User = {
        "firstName":"",
        roles:[]
    }


    getAuthCookie() {
        const auth = Cookies.get('isUserAuth');
        return auth;
    }


    getAuthUser(authUser) {
        //const authUser = Cookies.get('un');

        return axios.post(AppService.app_url("/api/auth_user"), authUser,
        {
             headers: { 'Content-Type': 'application/json'}
     
       });

    }


    getUserById(id) {
        //const authUser = Cookies.get('un');

        return axios.post(AppService.app_url("/api/user/details"), id,
        {
             headers: { 'Content-Type': 'application/json'}
     
       });

    }



    hasRole(role) {
        const roles = JSON.parse(Cookies.get('userRoles')?Cookies.get('userRoles'):false);

        if(roles) {
            for (var i = 0; i < roles.length; i++) {
        
                if (roles[i].name === role) {
                    return true;
                }
            }

        }
       
    
        return false;
        
    }

    hasRolev1(role, roles) {
        //receives the user Roles and check if it has the provided role
        //This is used to display only the roles that the user does not already have
        //Can be used to give access to the user based on their roles
        console.log("The roles", roles);

        if(roles) {
            for (var i = 0; i < roles.length; i++) {
                
    
                if (roles[i].name === role) {
                    return true;
                }
            }

        }
       
        return false;
        
    }



    
    getUsers() {
        
        return axios.get(AppService.app_url("/api/users"))
    
    }

    getRoles() {
        
        return axios.get(AppService.app_url("/api/roles"))
    
    }



    addRolesToUser(data) {
        
        //return axios.post(AppService.app_url("/api/addrolestouser"))

        console.log("The user and roles...", data);
        

        return axios.post(AppService.app_url("/api/addrolestouser"), data,
        {
             headers: { 'Content-Type': 'application/json'}
     
       });
    
    }

    removeUserRoles(data) {
        
        //return axios.post(AppService.app_url("/api/addrolestouser"))

        console.log("The user and roles...", data);
        

        return axios.post(AppService.app_url("/api/removeuserrole"), data,
        {
             headers: { 'Content-Type': 'application/json'}
     
       });
    
    }


    logOut () {
      
        return axios.get(AppService.app_url("/api/logout"))


    }


    uploadFile(data) {
      

        return axios.post(AppService.app_url("/api/uploadfile"), data, {
            headers: { 'Content-Type': 'multipart/form-data'}
    
      });

    }


    registerUser(data) {
        return axios.post(AppService.app_url("/api/register"), data,
            {
                 headers: { 'Content-Type': 'application/json'}
         
           });
    }

    updateUser(data) {
        return axios.post(AppService.app_url("/api/update"), data,
            {
                 headers: { 'Content-Type': 'application/json'}
         
           });
    }





    authenticate(data) {

        const instance = axios.create({
            withCredentials: true
          })


        return instance.post(AppService.app_url("/api/authenticate"), data, { headers: { 'Content-Type': 'application/json'} });


    }



    deleteUsersCSV(data) {


        return axios.post(AppService.app_url("/api/deleteusers"), data, 
            { headers: {  Authorization: true}, withCredentials: true } 
            );

        
    }
    
    
}

export default new UserService();