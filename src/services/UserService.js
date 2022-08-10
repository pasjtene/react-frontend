import axios from "axios";
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

const DELETE_USERS_REST_API_URL = "http://localhost:8085/api/deleteusers";

class UserService {
    //axios.defaults.withCredentials = true

    

    getUsers() {
        console.log("The current location...", window.location.origin);
        if(mylocation === "http://localhost:3000") {
            console.log("Yes, we are local");
            return axios.get(LOCAL_USERS_REST_API_URL);
            //return axios.get(mylocation+":8086/api/users");

        } else {
            console.log("We are on the server, we are local");
            return axios.get(USERS_REST_API_URL);

        }
    
       //return axios.get(USERS_REST_API_URL);
    }

    deleteUsersCSV(data) {
        const instance = axios.create({
            withCredentials: true
          })
        console.log("The datum..",data);
        return instance.post(DELETE_USERS_REST_API_URL, data
            );
    }
    
    
}

export default new UserService();