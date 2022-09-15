import { useUser } from "./UserContext";
import { useEffect } from "react";
import Cookies from 'js-cookie';

//export const user = useUser();



function User() {
    const user = useUser();
    //const updateUser = useUserUpdate();

    useEffect(()=>{
        if(Cookies.get("user")) {
            const authUser = JSON.parse(Cookies.get("user"));
           
        console.log("The user from FN2 home component...", authUser.firstName);

        }
        
    },[user])


    return(
        user
    
              //  <UserProfile user={this.props.user}/>
        
    );
}

export default User