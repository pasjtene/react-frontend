import { useUser } from "./user/UserContext";
import UserProfile from "./UserProfile";
import Cookies from 'js-cookie';

import { useEffect, useState } from "react";
import Login from "./Login";
import UserRoles from "./user/UserRoles";

//function Content(props) {
    const Content = (props) => {
        const [tartget, setTarget] = useState("");
        const user = useUser();
    //const updateUser = useUserUpdate();

    useEffect(()=>{
        console.log("The user to target is:...", user);
        
        //if(Cookies.get("user")) {
            if(user.id) {
                setTarget(props.target);
                console.log("Settinng target to ...",props.target);

            }
            //const authUser = JSON.parse(Cookies.get("user"));
           
        console.log("The target Component is ", props.target);

        

       // }
        
    },[user])

    switch(tartget) {
        case "user-profile" : return (<UserProfile user={user}/> );
        case "user-roles" : return (<UserRoles user={user}/> );
    }


    return(
        <Login target="log-in"/>          
       
    );
   
}

export default Content