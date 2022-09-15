

import { useUser } from "../component/user/UserContext";
const mylocation = window.location.origin;
const SERVER_API_URL = 'http://51.68.196.188:8080/talodu';
const LOCAL_API_URL = 'http://localhost:8086';


class AppService {

    app_url(url) {
        
        if(mylocation === "http://localhost:3000") {
           // console.log("Yes, we are local");
            return 'http://localhost:8086'+url;
            

        } else {
            //console.log("We are on the server, we are not local");
            return 'http://51.68.196.188:8080/talodu'+url;

        }
    
    }





}

export default new AppService();