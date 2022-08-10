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
const USERS_REST_API_URL = 'http://51.68.196.188:8080/talodu/api/users';

const DELETE_USERS_REST_API_URL = "http://localhost:8085/api/deleteusers";

class UserService {
    //axios.defaults.withCredentials = true

    getUsers() {
       return axios.get(USERS_REST_API_URL);
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