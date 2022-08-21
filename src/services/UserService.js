import axios from "axios";
import Cookies from 'js-cookie';
//import useAxios, { configure } from 'axios-hooks'
axios.defaults.withCredentials = true;
const API_SERVER = 'http://localhost:8085/api';

const instance = axios.create({
    withCredentials: true,
    baseURL: API_SERVER,
    })
    
    
    //configure({ instance })
    
    
   // const [{ data, loading, error }, refetch] = useAxios()






//const USERS_REST_API_URL = 'http://localhost:8080/talodu/api/users';

const mylocation = window.location.origin;

const USERS_REST_API_URL = 'http://51.68.196.188:8080/talodu/api/users';
const LOCAL_USERS_REST_API_URL = 'http://localhost:8086/api/users';

const REGISTER_API_URL = 'http://51.68.196.188:8080/talodu/api/register';
const LOCAL_REGISTER_API_URL = 'http://localhost:8086/api/register';



const LOGIN_URL = 'http://51.68.196.188:8080/talodu/api/authenticate';
const LOCAL_LOGIN_URL = 'http://localhost:8086/api/authenticate';

const DELETE_USERS_API_URL = "http://51.68.196.188:8080/talodu/api/deleteusers";
const LOCAL_DELETE_USERS_API_URL = "http://localhost:8086/api/deleteusers";

const LOGOUT_API_URL = "http://51.68.196.188:8080/talodu/api/logout";
const LOCAL_LOGOUT_API_URL = "http://localhost:8086/api/logout";

const LOCAL_FILE_UPLOAD_URL = "http://localhost:8086/api/uploadfile";
const FILE_UPLOAD_URL = "http://51.68.196.188:8080/talodu/api/uploadfile";







class UserService {
    //axios.defaults.withCredentials = true


    getAuthCookie() {
        const auth = Cookies.get('isUserAuth');
        return auth;
    }

    
    getUsers() {
        
        if(mylocation === "http://localhost:3000") {
            console.log("Yes, we are local");
            return axios.get(LOCAL_USERS_REST_API_URL);
            

        } else {
            console.log("We are on the server, we are not local");
            return axios.get(USERS_REST_API_URL);

        }
    
    }


    logOut () {
        console.log("The current location...", window.location.origin);
        if(mylocation === "http://localhost:3000") {
            console.log("Yes, we are local");
            return axios.get(LOCAL_LOGOUT_API_URL);
            

        } else {
            console.log("We are on the server, we are not local");
            return axios.get(LOGOUT_API_URL);

        }
    }


    uploadFile(data) {
        const instance = axios.create({
            withCredentials: true
          })

        if(mylocation === "http://localhost:3000") {
        
            return instance.post(LOCAL_FILE_UPLOAD_URL, data
            );
            

        } else {
            
            return instance.post(FILE_UPLOAD_URL, data);

        }

    }


    registerUser(data) {
        if(mylocation === "http://localhost:3000") {
        
            return axios.post(LOCAL_REGISTER_API_URL, data,
                {
                     headers: { 'Content-Type': 'application/json'}
             
               }
            );
            

        } else {
            
            return axios.post(REGISTER_API_URL, data,
                {
                     headers: { 'Content-Type': 'application/json'}
             
               });

        }

    }






    registerUser(data) {
        if(mylocation === "http://localhost:3000") {
        
            return axios.post(LOCAL_REGISTER_API_URL, data,
                {
                     headers: { 'Content-Type': 'application/json'}
             
               }
            );
            

        } else {
            
            return axios.post(REGISTER_API_URL, data,
                {
                     headers: { 'Content-Type': 'application/json'}
             
               });

        }


    }

    authenticate(data) {
        const instance = axios.create({
            withCredentials: true
          })
        console.log("The current location...", window.location.origin);
        if(mylocation === "http://localhost:3000") {
        
            return instance.post(LOCAL_LOGIN_URL, data, { headers: { 'Content-Type': 'application/json'} });
            
        } else {
            
            return instance.post(LOGIN_URL, data, { headers: { 'Content-Type': 'application/json'} });
           
        }
    }



    deleteUsersCSV(data, userCookie) {
        const instance = axios.create({
            withCredentials: true
          })
        console.log("The datum..",data);

        if(mylocation === "http://localhost:3000") {
            console.log("We are on the client, the cookie is....",userCookie);
            return instance.post(LOCAL_DELETE_USERS_API_URL, data, 
                { headers: {  Authorization: true}, withCredentials: true } 
                );
        } else {

            console.log("We are on the server, the cookie is....",userCookie);
            
            return instance.post(DELETE_USERS_API_URL, data, 
                { headers: {  Authorization: true}, withCredentials: true } 
                ).then(resp => {
                    console.log("The response");
                    console.log(resp);
                }

                );
        }

        
    }
    
    
}

export default new UserService();